import { useEffect } from 'react';
import { useRouter } from 'next/router';

const PIXEL_ID = '1757361357785350';

const isDev = process.env.NODE_ENV === 'development';

export default function useFacebookTracking() {
  const router = useRouter();

  useEffect(() => {
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        if (!isDev) {
          ReactPixel.init(PIXEL_ID);
          ReactPixel.pageView();
        } else {
          console.log('FB: initialize');
          console.log('FB: send page view');
        }
      });
  }, [router.pathname]);
}
