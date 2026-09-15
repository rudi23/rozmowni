import { useCallback } from 'react';
import tracking from '../services/tracking';

export default function useClickTracking() {
  // Stable identity, so the callback can sit in a useEffect dependency array
  // without restarting the effect on every render.
  const trackClick = useCallback((eventData) => {
    if (!eventData) {
      return;
    }

    tracking
      .initializeAsync()
      .then((tracker) => tracking.sendEvent(tracker, eventData))
      // A blocked or failed react-ga4 chunk just means no event. Swallowing it
      // keeps analytics from surfacing as an unhandled rejection - and this now
      // runs once per question, not only on deliberate clicks.
      .catch(() => {});
  }, []);

  return trackClick;
}
