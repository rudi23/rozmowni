import { useEffect } from 'react';
import Link from 'next/link';
import useClickTracking from '../hooks/useClickTracking';
import { routeMap, routeNames } from '../routes';
import CourseRequirements from './CourseRequirements';
import CourseDetails from './CourseDetails';
import ResponsiveImage from './ResponsiveImage';
import styles from './CourseSidebar.module.scss';

export default function CourseSidebar({
  image,
  imageAlt,
  price,
  enrollEvent,
  courseDetails,
  showRequirements = true,
}) {
  const trackClick = useClickTracking();

  // Below the sidebar breakpoint the price and the button move to a bar fixed
  // to the bottom of the screen, so the document needs room under it.
  useEffect(() => {
    document.body.classList.add('has-course-price-bar');

    return () => document.body.classList.remove('has-course-price-bar');
  }, []);

  return (
    <>
      {/* Sticky, so the price stays in reach however long the content runs. */}
      <aside className={styles.sidebar}>
        <div className={styles.priceCard}>
          <div className={styles.thumb}>
            <ResponsiveImage
              src={image}
              alt={imageAlt}
              placeholder="blur"
              sizes="(min-width: 1200px) 350px, (min-width: 992px) 290px, (min-width: 768px) 690px, 100vw"
              quality="75"
              style={{ height: '100%', maxWidth: '100%' }}
            />
          </div>
          <div className={styles.priceBody}>
            <p className={styles.priceLabel}>Cena</p>
            <p className={styles.price}>{price}</p>
            <Link
              href={routeMap[routeNames.CONTACT]}
              className={styles.enroll}
              onClick={() => trackClick(enrollEvent)}
            >
              Zapisz się
            </Link>
          </div>
        </div>

        <CourseDetails items={courseDetails} />
        {showRequirements && <CourseRequirements />}
      </aside>

      <div className={styles.priceBar}>
        <div className={styles.priceBarText}>
          <span className={styles.priceBarLabel}>Cena</span>
          <strong className={styles.priceBarValue}>{price}</strong>
        </div>
        <Link
          href={routeMap[routeNames.CONTACT]}
          className={styles.priceBarButton}
          onClick={() => trackClick(enrollEvent)}
        >
          Zapisz się
        </Link>
      </div>
    </>
  );
}
