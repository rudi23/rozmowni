const PIXEL_ID = '1757361357785350';

const isDev = process.env.NODE_ENV === 'development';

function readCookie(name) {
  if (typeof document === 'undefined') {
    return undefined;
  }

  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : undefined;
}

// `_fbc` is normally written by the pixel itself when someone lands with an
// `fbclid`, but a blocked pixel never gets to write it - and that is precisely
// the visit the Conversions API has to rescue, since an ad click is the only
// thing that lets Meta attribute the conversion to a campaign at all. Meta
// documents this exact shape, so it can be rebuilt from the URL by hand.
function buildClickIdFromUrl() {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const fbclid = new window.URLSearchParams(window.location.search).get(
    'fbclid',
  );

  if (!fbclid) {
    return undefined;
  }

  return `fb.1.${Date.now()}.${fbclid}`;
}

export function initializeAsync() {
  return import('react-facebook-pixel').then((x) => x.default);
}

export function sendPageView(ReactPixel) {
  if (!isDev) {
    ReactPixel.init(PIXEL_ID);
    ReactPixel.pageView();
  } else {
    console.log('FB: initialize');
    console.log('FB: send page view');
  }
}

export function sendEvent(ReactPixel, { name, data }, eventId) {
  if (!isDev) {
    // ReactPixel.track() is silently dropped when the pixel has not been
    // initialized on this module instance, so init first. Re-initializing the
    // same pixel id is a no-op for Meta and does not emit another PageView.
    ReactPixel.init(PIXEL_ID);

    // track() forwards only two arguments, leaving nowhere to put the event id.
    // .fbq() is the library's own passthrough to the global fbq, which does take
    // the fourth options argument - the only way to deduplicate this against the
    // server-side copy of the same conversion.
    if (eventId) {
      ReactPixel.fbq('track', name, data, { eventID: eventId });
    } else {
      ReactPixel.track(name, data);
    }
  } else {
    console.log(`FB: send event: ${name}`, data, { eventId });
  }
}

// Shared by the browser event and its Conversions API twin so Meta collapses
// the pair into one conversion instead of counting it twice.
export function createEventId() {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

// Meta's own cookies, forwarded to the server untouched: `_fbp` identifies the
// browser, `_fbc` the ad click. They are what lets a server-side conversion be
// matched back to a campaign - and they are personal data under GDPR, being
// persistent identifiers that single out one browser and tie it to an ad
// profile. Sending them is a disclosure decision, not a technical detail.
export function getBrowserIds() {
  return {
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc') || buildClickIdFromUrl(),
  };
}
