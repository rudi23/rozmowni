import { createHash } from 'crypto';
import { getClientIp } from './clientIp';

const PIXEL_ID = '1757361357785350';
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
// Set it only while validating in Events Manager > Test events. A payload
// carrying this code is shown in that tab and excluded from optimisation, so it
// must stay unset in production or the conversions never reach the pixel.
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;
const GRAPH_API_VERSION = 'v21.0';

const isDev = process.env.NODE_ENV === 'development';
const isConfigured = Boolean(ACCESS_TOKEN);

// Meta matches a server event to a person by comparing SHA-256 hashes, so the
// value has to be normalized exactly the way the browser normalizes it -
// trimmed and lower-cased - or the digest simply never matches anything.
function hash(value) {
  const normalized = String(value || '')
    .trim()
    .toLowerCase();

  if (!normalized) {
    return undefined;
  }

  return createHash('sha256').update(normalized).digest('hex');
}

// Meta only matches phone numbers as E.164 digits, with no '+' and no
// separators. The form asks for a plain Polish number ('123 456 789'), so the
// country code has to be added before hashing or the digest matches nothing.
function normalizePhone(phone) {
  let digits = String(phone || '').replace(/\D/g, '');

  // The form's pattern accepts '0048 123 456 789' as readily as '+48 ...', and
  // E.164 carries neither '+' nor '00' - left in, the leading zeros go into the
  // digest and the number matches nothing.
  if (digits.startsWith('00')) {
    digits = digits.slice(2);
  } else if (digits.length === 10 && digits.startsWith('0')) {
    // The trunk '0' was dropped in 2009 but is still typed out of habit.
    digits = digits.slice(1);
  }

  if (digits.length === 9) {
    return `48${digits}`;
  }

  return digits;
}

// Everything the lead typed is hashed here and never leaves unhashed. The rest
// - `fbp`, `fbc`, the IP and the User-Agent - goes in the clear, because Meta
// matches on those verbatim. They are still personal data under GDPR: they are
// persistent identifiers that single out one browser and tie it to an ad
// profile, and hashing the form fields does not change that.
function buildUserData({
  email,
  phone,
  fullName,
  fbp,
  fbc,
  clientIp,
  userAgent,
}) {
  const [firstName, ...rest] = String(fullName || '')
    .trim()
    .split(/\s+/);

  const userData = {
    em: hash(email),
    ph: hash(normalizePhone(phone)),
    fn: hash(firstName),
    ln: hash(rest.join(' ')),
    fbp,
    fbc,
    client_ip_address: clientIp,
    client_user_agent: userAgent,
  };

  return Object.fromEntries(
    Object.entries(userData).filter(([, value]) => Boolean(value)),
  );
}

async function postEventAsync(payload) {
  const response = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    },
  );

  // Meta answers 200 with an error object for a malformed payload as readily as
  // it answers 4xx, so the status alone would report a rejected conversion as a
  // success - and a silently rejected conversion is the exact failure this
  // module exists to prevent. Read the body and judge on both. There is no
  // caller left to tell, so this logs.
  const body = await response.text().catch(() => '');

  let result = null;

  try {
    result = JSON.parse(body);
  } catch {
    // A non-JSON body is itself a signal something is wrong; `result` stays
    // null and the checks below fall through to the status.
  }

  if (!response.ok || result?.error) {
    console.error('Meta CAPI rejected the event:', response.status, body);

    return;
  }

  // Every call here sends exactly one event, so only an explicit count of one
  // is a delivered conversion. Anything else - a 200 whose body did not parse,
  // an empty body, a payload with no count at all - is treated as a loss rather
  // than assumed to be fine, which is the silent path this parsing exists to
  // close.
  if (result?.events_received !== 1) {
    console.error(
      'Meta CAPI did not confirm the event:',
      response.status,
      body,
    );
  }
}

// Deliberately fire-and-forget, for the same reason posthogServer.js is: by the
// time this runs the lead's email has already gone out, so an unreachable or
// slow Graph API must never delay the response, and must never turn a delivered
// lead into a 500. Nothing is awaited and nothing is allowed to throw.
function sendEvent({
  eventName,
  eventId,
  eventSourceUrl,
  userData = {},
  customData,
}) {
  if (isDev) {
    console.log(`Meta CAPI: send event: ${eventName}`, {
      eventId,
      // The hashes, not the values: this log is the one place a developer could
      // otherwise read a lead's email off the console.
      userData: buildUserData(userData),
      customData,
    });

    return;
  }

  if (!isConfigured) {
    return;
  }

  try {
    postEventAsync({
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          // Shared with the browser event so Meta collapses the two copies into
          // one conversion. Without it every conversion is counted twice.
          event_id: eventId,
          action_source: 'website',
          event_source_url: eventSourceUrl,
          user_data: buildUserData(userData),
          ...(customData && { custom_data: customData }),
        },
      ],
      ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }),
      access_token: ACCESS_TOKEN,
    }).catch((error) => {
      console.error('Meta CAPI request failed:', error.message);
    });
  } catch {
    // An analytics failure is not worth failing the request over.
  }
}

// The browser sends these alongside the form; both are optional, because the
// pixel may have been blocked before it could ever set them.
function getBrowserIdsFromRequest(req) {
  return {
    fbp: req.body?.fbp || undefined,
    fbc: req.body?.fbc || undefined,
    // Last hop, not first: the leftmost entry is the one a caller can forge,
    // and forwarding a forged address to Meta as `client_ip_address` degrades
    // matching for everyone. Same rule as the rate limiter - see clientIp.js.
    clientIp: getClientIp(req),
    userAgent: req.headers['user-agent'] || undefined,
  };
}

export { sendEvent, getBrowserIdsFromRequest };
