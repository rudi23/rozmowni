import { useRouter } from 'next/router';
import Head from 'next/head';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '../styles/globals.css';
import '../styles/bootstrap.scss';
import '../styles/style.css';
import '../styles/responsive.css';
import '../pages/kontakt/index.css';
import 'react-multi-carousel/lib/styles.css';
import '../styles/carousel.css';
import '../components/Footer.css';
import '../components/Header.scss';
import '../../public/libs/bicon/css/bicon.min.css';
import '../../public/fonts/fonts.css';
import '../../public/fonts/fonts2.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';
import Metadata from '../components/Metadata';
import useFacebookTracking from '../hooks/useFacebookTracking';
import usePageViewTracking from '../hooks/usePageViewTracking';

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

function MyApp({ Component, pageProps }) {
  useFacebookTracking();
  usePageViewTracking();
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="google-site-verification"
          content="4W6QR83BrQqcoj5AbtFIQmoKFixeHj_ZVGHtnfsec_Q"
        />
        <title />
      </Head>
      <Metadata routePath={router.pathname} />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <CookieConsent />
    </>
  );
}

export default MyApp;
