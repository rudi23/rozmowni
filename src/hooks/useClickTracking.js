import { useCallback } from 'react';
import {
  initializeAsync as initializeGaAsync,
  sendEvent as sendGaEvent,
} from '../services/tracking/googleAnalytics';
import {
  initializeAsync as initializePostHogAsync,
  sendEvent as sendPostHogEvent,
} from '../services/tracking/posthog';

export default function useClickTracking() {
  // Stable identity, so the callback can sit in a useEffect dependency array
  // without restarting the effect on every render.
  const trackClick = useCallback((eventData) => {
    if (!eventData) {
      return;
    }

    initializeGaAsync()
      .then((ReactGA) => sendGaEvent(ReactGA, eventData))
      // A blocked or failed react-ga4 chunk just means no event. Swallowing it
      // keeps analytics from surfacing as an unhandled rejection - and this now
      // runs once per question, not only on deliberate clicks.
      .catch(() => {});

    initializePostHogAsync()
      .then((posthog) => sendPostHogEvent(posthog, eventData))
      .catch(() => {});
  }, []);

  return trackClick;
}
