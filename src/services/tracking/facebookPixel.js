const PIXEL_ID = '1757361357785350';

const isDev = process.env.NODE_ENV === 'development';

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

export function sendEvent(ReactPixel, { name, data }) {
  if (!isDev) {
    // ReactPixel.track() is silently dropped when the pixel has not been
    // initialized on this module instance, so init first. Re-initializing the
    // same pixel id is a no-op for Meta and does not emit another PageView.
    ReactPixel.init(PIXEL_ID);
    ReactPixel.track(name, data);
  } else {
    console.log(`FB: send event: ${name}`, data);
  }
}
