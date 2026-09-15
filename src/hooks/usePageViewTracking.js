import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  initializeAsync as initializeGaAsync,
  sendPageView as sendGaPageView,
} from '../services/tracking/googleAnalytics';

function usePageViewTracking() {
  const router = useRouter();

  useEffect(() => {
    initializeGaAsync().then((ReactGA) =>
      sendGaPageView(ReactGA, router.pathname),
    );
  }, [router.pathname]);
}

export default usePageViewTracking;
