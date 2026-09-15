import { useEffect } from 'react';
import { initializeAsync } from '../services/tracking/posthog';

export default function usePostHogTracking() {
  // PostHog captures page views itself, SPA history changes included, so this
  // only has to bring the client up once per page load. Doing it here rather
  // than from a static import keeps posthog-js out of the shared bundle.
  useEffect(() => {
    initializeAsync();
  }, []);
}
