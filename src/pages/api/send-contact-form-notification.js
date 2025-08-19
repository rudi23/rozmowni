import { sendContactFormEmailNotification } from '../../utils/emailService';
import { validateApiKey } from '../../utils/apiAuth';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 3, // max 3 requests per minute (more restrictive for contact forms)
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

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check authentication
    const authResult = authenticateRequest(req);
    if (!authResult.authenticated) {
      return res.status(401).json({
        error: 'Authentication required',
        details: authResult.error,
      });
    }

    // Check rate limiting
    const rateLimitResult = checkRateLimit(req);
    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        error: 'Too many requests',
        details: rateLimitResult.error,
        resetTime: rateLimitResult.resetTime,
      });
    }

    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message'],
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate message length (prevent spam)
    if (message.length > 2000) {
      return res
        .status(400)
        .json({ error: 'Message too long. Maximum 2000 characters.' });
    }

    // Send contact form notification
    await sendContactFormEmailNotification({
      name,
      email,
      phone: phone || 'Nie podano',
      subject,
      message,
    });

    res.status(200).json({
      success: true,
      message: 'Contact form notification sent successfully',
      debug: { recipient: 'admin' },
    });
  } catch (error) {
    console.error('Error sending contact form notification:', error);

    // Return appropriate error response
    res.status(500).json({
      error: 'Internal server error',
      details: error.message,
      code: error.code,
    });
  }
}
