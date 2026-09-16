import {
  initializeAsync,
  sendEvent,
  createEventId,
} from '../services/tracking/facebookPixel';

export default function useFacebookEventTracking() {
  // Returns the id the browser event was sent under, so the caller can report
  // the same conversion server-side under that id and have Meta deduplicate the
  // pair. Callers that must know the id first - because it has to travel in a
  // request body sent before the pixel fires - pass their own in.
  function trackFacebookEvent(eventData, eventId = createEventId()) {
    if (!eventData) {
      return null;
    }

    initializeAsync()
      .then((ReactPixel) => sendEvent(ReactPixel, eventData, eventId))
      // Pixel is blocked far more often than GA; a failed chunk must not show
      // up as an unhandled rejection.
      .catch(() => {});

    return eventId;
  }

  return trackFacebookEvent;
}
