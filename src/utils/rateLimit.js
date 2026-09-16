// Held in process memory, exactly like the copies inside the two email routes:
// it resets on restart and is not shared across instances. That is enough to
// blunt a script hammering an endpoint, and nothing more.
const WINDOW_MS = 60 * 1000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

// `x-forwarded-for` is a list the client can seed: a caller sending its own
// header gets that value prepended, so keying on the whole string - or on the
// first entry - hands out a fresh bucket on every request and the limit stops
// limiting anything. Only the last entry is written by the proxy in front of
// the app, so that is the one worth trusting. This assumes exactly one such
// proxy (Passenger's), which is what the deploy sets up; behind a second one
// the correct entry would be the second from the end.
function getClientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.trim()) {
    const hops = forwarded.split(',');

    return hops[hops.length - 1].trim();
  }

  return req.socket?.remoteAddress || 'unknown';
}

function createRateLimiter({ maxRequests, windowMs = WINDOW_MS }) {
  const store = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of store.entries()) {
      if (now > value.resetTime) {
        store.delete(key);
      }
    }
  }, CLEANUP_INTERVAL_MS);

  return function check(req) {
    const clientIp = getClientKey(req);
    const now = Date.now();
    const client = store.get(clientIp);

    if (!client || now > client.resetTime) {
      store.set(clientIp, { count: 1, resetTime: now + windowMs });

      return { allowed: true };
    }

    if (client.count >= maxRequests) {
      return {
        allowed: false,
        error: `Rate limit exceeded. Maximum ${maxRequests} requests per minute.`,
        resetTime: new Date(client.resetTime).toISOString(),
      };
    }

    client.count += 1;

    return { allowed: true };
  };
}

export { createRateLimiter };
