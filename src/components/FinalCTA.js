import Link from 'next/link';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import TrustPoints from './TrustPoints';
import styles from './FinalCTA.module.scss';

export default function FinalCTA() {
  const trackClick = useClickTracking();

  return (
    <section className={styles.finalCTA}>
      <div className="container">
        <div className={styles.inner}>
          <h2 className={styles.heading}>Sprawdź swój poziom w 10 minut</h2>

          <p className={styles.subtitle}>
            Bezpłatny test pokaże, na jakim poziomie jesteś. W ciągu 24 godzin
            wyślemy zaproszenie na lekcję próbną i e-book „Czas na angielski”.
          </p>

          <Link
            href={routeMap[routeNames.TEST]}
            className={`btn btn-main ${styles.finalButton}`}
            onClick={() => trackClick(events.HOME_FINAL_CTA_CLICK_TEST)}
          >
            Zrób bezpłatny test
          </Link>

          <TrustPoints
            align="center"
            className={styles.guarantee}
            items={[
              'Bez zobowiązań',
              'Żadnego spamu',
              'Możesz wypisać się w każdej chwili',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
