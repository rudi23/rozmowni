import Head from 'next/head';
import Link from 'next/link';
import PageHeader from '../components/PageHeader';
import Section from '../components/Section';
import ResponsiveImage from '../components/ResponsiveImage';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import image404 from '../../public/images/404.jpg';

export default function Page404() {
  const trackClick = useClickTracking();

  return (
    <>
      {/* '/404' has no routeMap entry, so Metadata only supplies a generic
          fallback title; the page names itself (next/head keeps the last one). */}
      <Head>
        <title>Nie znaleziono strony | Rozmowni.pl</title>
      </Head>
      <PageHeader
        title="Nie znaleźliśmy tej strony"
        lede="Adres mógł się zmienić albo w linku jest literówka. Wróć na stronę główną albo sprawdź swój poziom angielskiego."
      />
      <Section>
        <div className="row justify-content-center">
          <div className="col-lg-5 col-md-8">
            <div className="img-block">
              <ResponsiveImage
                src={image404}
                alt="Ilustracja błędu 404 – strona nie istnieje"
                placeholder="blur"
                sizes="(min-width: 992px) 450px, (min-width: 768px) 690px, 100vw"
                quality="75"
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
          <Link
            href={routeMap[routeNames.TEST]}
            className="btn btn-main"
            onClick={() => trackClick(events.NOT_FOUND_CLICK_TEST)}
          >
            Zrób bezpłatny test
          </Link>
          <Link
            href={routeMap[routeNames.HOME]}
            className="btn btn-outline"
            onClick={() => trackClick(events.NOT_FOUND_CLICK_HOME)}
          >
            Wróć na stronę główną
          </Link>
        </div>
      </Section>
    </>
  );
}
