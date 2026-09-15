import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeAsync, sendPageView } from '../services/tracking/postHog';

export default function usePostHogTracking() {
  const router = useRouter();

  useEffect(() => {
    initializeAsync().then((posthog) => sendPageView(posthog, router.pathname));
  }, [router.pathname]);
}
