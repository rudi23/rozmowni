import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import styles from './NewSemesterSignUp.module.scss';

// This used to be a full section with a photo and six paragraphs repeating
// the home page, ahead of the course the visitor came to read about.
export default function NewSemesterSignUp() {
  const trackClick = useClickTracking();

  return (
    <aside className={styles.strip}>
      <div className="container">
        <div className={styles.inner}>
          <p className={styles.text}>
            <strong>Zapisy na rok szkolny 2026/2027 są otwarte.</strong> Kursy
            prowadzimy online, na wszystkich poziomach zaawansowania.
          </p>
          <Link
            href={routeMap[routeNames.TEST]}
            className={styles.link}
            onClick={() => trackClick(events.INDIVIDUAL_COURSE_CLICK_TEST)}
          >
            Sprawdź swój poziom
            <FontAwesomeIcon icon={faArrowRight} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
