import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  initializeAsync,
  sendPageView,
} from '../services/tracking/facebookPixel';

export default function useFacebookTracking() {
  const router = useRouter();

  useEffect(() => {
    initializeAsync().then((ReactPixel) => sendPageView(ReactPixel));
  }, [router.pathname]);
}
