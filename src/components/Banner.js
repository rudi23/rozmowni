import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeNames, routeMap } from '../routes';
import mainImage from '../../public/images/main.jpg';
import TrustPoints from './TrustPoints';
import styles from './Banner.module.scss';
import ResponsiveImage from './ResponsiveImage';

export default function Banner() {
  const trackClick = useClickTracking();

  return (
    <section className={styles.bannerSection}>
      <div className="container">
        <div className={styles.bannerGrid}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Ponad 100 zadowolonych uczniów</p>

            <h1>Mów swobodnie po angielsku</h1>

            <p className={styles.lede}>
              Indywidualne i grupowe kursy online, na których rozmawiasz od
              pierwszej lekcji. Zacznij od bezpłatnego testu poziomującego —
              dostaniesz swój poziom, lekcję próbną i{' '}
              <span className={styles.nowrap}>e-book</span>.
            </p>

            <div className={styles.ctaButtons}>
              <Link
                href={routeMap[routeNames.TEST]}
                className={`btn btn-main ${styles.primaryCta}`}
                onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}
              >
                Zrób bezpłatny test
              </Link>

              <Link
                href="#dlaczego-my"
                className={`btn btn-outline ${styles.secondaryCta}`}
                onClick={() => trackClick(events.HOME_BANNER_CLICK_LEARN_MORE)}
              >
                <FontAwesomeIcon icon={faArrowDown} aria-hidden="true" />
                Zobacz, jak uczymy
              </Link>
            </div>

            <TrustPoints
              className={styles.trustElements}
              items={['Test zajmuje 10 minut', 'Wynik od razu', 'Bez spamu']}
            />
          </div>

          <div className={styles.bannerImage}>
            <ResponsiveImage
              src={mainImage}
              alt="Małgorzata Rudowska przy biurku"
              placeholder="blur"
              sizes="(min-width: 1200px) 520px, (min-width: 768px) 45vw, 100vw"
              quality="75"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
