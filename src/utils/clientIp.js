// `x-forwarded-for` is a list the caller can seed. A client that sends its own
// header gets that value kept and the proxy appends the address it actually saw,
// so the list reads "<whatever the client claimed>, <real peer>". The leftmost
// entry is therefore the one entry an attacker fully controls, and the last is
// the one written by the proxy in front of the app.
//
// Both callers want the last entry, for different reasons: the rate limiter
// because a forgeable key stops limiting anything, and the Conversions API
// because a forged address is sent to Meta as `client_ip_address` and quietly
// degrades matching.
//
// This assumes exactly one trusted proxy, which is what the deploy sets up
// (Passenger). Behind a second one the correct entry would be second from
// the end.
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];

  if (typeof forwarded === 'string' && forwarded.trim()) {
    const hops = forwarded.split(',');

    return hops[hops.length - 1].trim();
  }

  return req.socket?.remoteAddress || undefined;
}

export { getClientIp };
