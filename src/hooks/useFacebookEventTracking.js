import { initializeAsync, sendEvent } from '../services/tracking/facebookPixel';

export default function useFacebookEventTracking() {
  function trackFacebookEvent(eventData) {
    if (!eventData) {
      return;
    }

    initializeAsync().then((ReactPixel) => sendEvent(ReactPixel, eventData));
  }

  return trackFacebookEvent;
}
