// Held in process memory, exactly like the copies inside the two email routes:
// it resets on restart and is not shared across instances. That is enough to
// blunt a script hammering an endpoint, and nothing more.
const WINDOW_MS = 60 * 1000;
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

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
    const clientIp =
      req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
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
