import { useEffect } from 'react';
import { useRouter } from 'next/router';
import tracking from '../services/tracking';

function usePageViewTracking() {
  const router = useRouter();

  useEffect(() => {
    tracking
      .initializeAsync()
      .then((tracker) => tracking.sendPageView(tracker, router.pathname));
  }, [router.pathname]);
}

export default usePageViewTracking;
