import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import {
  sendTestResultsEmail,
  sendTestResultsEmailNotification,
} from '../../utils/emailService';
import { validateApiKey } from '../../utils/apiAuth';
import {
  captureEvent,
  captureRejection,
  captureException,
} from '../../utils/posthogServer';
import {
  sendEvent as sendFacebookEvent,
  getBrowserIdsFromRequest,
} from '../../utils/metaCapi';
import { TEST_CONTACT_DETAILS_SUBMITTED } from '../../services/tracking/facebookEvents';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // max 5 requests per minute
};

// Authentication middleware
const authenticateRequest = (req) => {
  if (!validateApiKey(req)) {
    return { authenticated: false, error: 'Invalid API key' };
  }

  return { authenticated: true };
};

// Rate limiting middleware
const checkRateLimit = (req) => {
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  const now = Date.now();

  if (!rateLimitStore.has(clientIp)) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });

    return { allowed: true };
  }

  const clientData = rateLimitStore.get(clientIp);

  // Reset if window has passed
  if (now > clientData.resetTime) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });

    return { allowed: true };
  }

  // Check if limit exceeded
  if (clientData.count >= RATE_LIMIT.maxRequests) {
    return {
      allowed: false,
      error: `Rate limit exceeded. Maximum ${RATE_LIMIT.maxRequests} requests per minute.`,
      resetTime: new Date(clientData.resetTime).toISOString(),
    };
  }

  // Increment count
  clientData.count += 1;
  rateLimitStore.set(clientIp, clientData);

  return { allowed: true };
};

// Clean up old entries from rate limit store (every 5 minutes)
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  },
  5 * 60 * 1000,
);

// Function to save test results to CSV file
const saveToCSV = (data) => {
  try {
    const csvFilePath =
      process.env.CSV_FILE_PATH || path.join(process.cwd(), 'test-results.csv');

    // CSV headers
    const headers = [
      'timestamp',
      'fullName',
      'email',
      'phone',
      'contactMethod',
      'testScore',
      'testLevel',
      'testType',
      'totalQuestions',
    ];

    // Prepare CSV row data
    const timestamp = new Date().toISOString();
    const csvRow = [
      timestamp,
      `"${data.fullName.replace(/"/g, '""')}"`, // Escape quotes in CSV
      data.email,
      data.phone || '',
      data.contactMethod || '',
      data.testScore,
      `"${data.testLevel.replace(/"/g, '""')}"`, // Escape quotes in CSV
      data.testType,
      data.totalQuestions,
    ].join(',');

    // Check if file exists, if not create with headers
    if (!fs.existsSync(csvFilePath)) {
      fs.writeFileSync(csvFilePath, headers.join(',') + '\n');
    }

    // Append new row
    fs.appendFileSync(csvFilePath, csvRow + '\n');

    console.log('Test result saved to CSV:', csvFilePath);
  } catch (error) {
    console.error('Error saving to CSV:', error);
  }
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // The browser sends its own ids so the server event joins the session that
  // is already being recorded; a random id keeps the event usable when it does
  // not (PostHog off in the browser, blocked chunk, direct API call).
  const distinctId = req.headers['x-posthog-distinct-id'] || randomUUID();
  const sessionId = req.headers['x-posthog-session-id'];

  // Answers exactly as before and reports the refusal on the way out. The 405
  // above is deliberately left out: a non-POST is a scanner, never a person with
  // a filled-in form, and counting it would only add noise to the funnel.
  const reject = (status, reason, body) => {
    captureRejection({
      distinctId,
      sessionId,
      route: 'send-test-results',
      reason,
      statusCode: status,
    });

    return res.status(status).json(body);
  };

  try {
    // Check authentication
    const authResult = authenticateRequest(req);
    if (!authResult.authenticated) {
      return reject(401, 'auth_failed', {
        error: 'Authentication required',
        details: authResult.error,
      });
    }

    // Check rate limiting
    const rateLimitResult = checkRateLimit(req);
    if (!rateLimitResult.allowed) {
      return reject(429, 'rate_limited', {
        error: 'Too many requests',
        details: rateLimitResult.error,
        resetTime: rateLimitResult.resetTime,
      });
    }

    const {
      fullName,
      email,
      phone,
      contactMethod,
      testScore,
      testLevel,
      testType,
      totalQuestions,
      correctAnswers,
      testLevelCode,
      facebookEventId,
    } = req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !testScore ||
      !testLevel ||
      !testType ||
      !totalQuestions
    ) {
      return reject(400, 'missing_fields', {
        error: 'Missing required fields',
        required: [
          'fullName',
          'email',
          'testScore',
          'testLevel',
          'testType',
          'totalQuestions',
        ],
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return reject(400, 'invalid_email', { error: 'Invalid email format' });
    }

    // Save data to CSV file
    saveToCSV({
      fullName,
      email,
      phone,
      contactMethod,
      testScore,
      testLevel,
      testType,
      totalQuestions,
    });

    // Check query parameter to determine which email to send
    const { emailType } = req.query;

    let deliveryType;
    let responseMessage;
    let responseRecipient;

    if (emailType === 'notification-only') {
      // Send only notification email to admin
      await sendTestResultsEmailNotification({
        fullName,
        email,
        phone,
        contactMethod,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });
      deliveryType = emailType;
      responseMessage = 'Notification email sent successfully';
      responseRecipient = 'admin';
    } else if (emailType === 'results-only') {
      // Send only test results email to user
      await sendTestResultsEmail({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });
      deliveryType = emailType;
      responseMessage = 'Test results email sent successfully';
      responseRecipient = email;
    } else {
      // Default: send both emails (original behavior)
      await sendTestResultsEmail({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });

      await sendTestResultsEmailNotification({
        fullName,
        email,
        phone,
        contactMethod,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });
      deliveryType = 'both';
      responseMessage = 'Both emails sent successfully';
      responseRecipient = email;
    }

    // The strongest conversion signal the site can give Meta: a lead that has
    // handed over a real email address. Hashed in metaCapi.js, never sent in the
    // clear, and skipped entirely when the browser did not supply an event id -
    // an unpaired copy would be counted a second time on top of the pixel's.
    if (facebookEventId) {
      const facebookEvent = TEST_CONTACT_DETAILS_SUBMITTED(testType);

      sendFacebookEvent({
        eventName: facebookEvent.name,
        eventId: facebookEventId,
        eventSourceUrl: req.headers.referer,
        userData: {
          email,
          phone,
          fullName,
          ...getBrowserIdsFromRequest(req),
        },
        customData: facebookEvent.data,
      });
    }

    captureEvent({
      distinctId,
      sessionId,
      event: 'test_results_processed',
      properties: {
        test_type: testType,
        // Prefer the plain code, so this property matches the client-side test
        // events. `testLevel` ('B1 - Intermediate') is the fallback for a stale
        // cached bundle that does not send the code yet.
        test_level: testLevelCode || testLevel,
        contact_method: contactMethod,
        delivery_type: deliveryType,
        total_questions: totalQuestions,
        // Omitted rather than zeroed when the client did not send them: zero is
        // a valid score and a default would skew the distribution.
        ...(typeof correctAnswers === 'number' && {
          score: correctAnswers,
          score_percent: Math.round((correctAnswers / totalQuestions) * 100),
        }),
      },
    });

    res.status(200).json({
      success: true,
      message: responseMessage,
      debug: { emailType: deliveryType, recipient: responseRecipient },
    });
  } catch (error) {
    console.error('Error sending test results emails:', error);
    captureException(error, { distinctId, sessionId });

    // Return appropriate error response
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
      code: error.code,
    });
  }
}
