import { validateApiKey } from '../../utils/apiAuth';
import { createRateLimiter } from '../../utils/rateLimit';
import { sendEvent, getBrowserIdsFromRequest } from '../../utils/metaCapi';
import { TEST_COMPLETED } from '../../services/tracking/facebookEvents';

// The browser fires this at the moment the results screen appears, so the
// ceiling only has to allow for a restarted test, not for a burst.
const checkRateLimit = createRateLimiter({ maxRequests: 10 });

// Carries no personal data by design: at test completion the lead has not typed
// an email yet - that is the next screen, and /api/send-test-results reports it
// with a hashed email attached. This endpoint exists purely so the test's own
// `CompleteRegistration` survives a blocked pixel, matched on Meta's cookies.
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateApiKey(req)) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const rateLimitResult = checkRateLimit(req);
  if (!rateLimitResult.allowed) {
    return res.status(429).json({
      error: 'Too many requests',
      details: rateLimitResult.error,
      resetTime: rateLimitResult.resetTime,
    });
  }

  const { eventId, testType, eventSourceUrl } = req.body || {};

  // Without the id Meta cannot pair this with the browser copy and would count
  // the same completed test twice, which is worse than not reporting it at all.
  if (!eventId || !testType) {
    return res.status(400).json({
      error: 'Missing required fields',
      required: ['eventId', 'testType'],
    });
  }

  const { name, data } = TEST_COMPLETED(testType);

  sendEvent({
    eventName: name,
    eventId,
    eventSourceUrl,
    userData: getBrowserIdsFromRequest(req),
    customData: data,
  });

  // Nothing is awaited above, so this returns while the Graph API call is still
  // in flight. The browser ignores the body; it only needs the request to have
  // been accepted.
  return res.status(202).json({ accepted: true });
}
