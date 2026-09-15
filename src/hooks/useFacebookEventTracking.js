import { initializeAsync, sendEvent } from '../services/tracking/facebookPixel';

export default function useFacebookEventTracking() {
  function trackFacebookEvent(eventData) {
    if (!eventData) {
      return;
    }

    initializeAsync()
      .then((ReactPixel) => sendEvent(ReactPixel, eventData))
      // Pixel is blocked far more often than GA; a failed chunk must not show
      // up as an unhandled rejection.
      .catch(() => {});
  }

  return trackFacebookEvent;
}
