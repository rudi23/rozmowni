import tracking from '../services/tracking';

export default function useClickTracking() {
  function trackClick(eventData) {
    if (!eventData) {
      return;
    }

    tracking
      .initializeAsync()
      .then((tracker) => tracking.sendEvent(tracker, eventData));
  }

  return trackClick;
}
