import Link from 'next/link';
import { useRouter } from 'next/router';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames, routeTitles } from '../routes';
import styles from './CourseLink.module.scss';

// A tracked link inside course copy. The test link is a funnel CTA and keeps
// the PostHog name the other test CTAs use; everything else is reported as
// 'Course content' with the target and the page it was clicked on.
export default function CourseLink({ routeName, children }) {
  const trackClick = useClickTracking();
  const { pathname } = useRouter();
  const event =
    routeName === routeNames.TEST
      ? events.COURSE_CLICK_TEST(pathname)
      : events.COURSE_CLICK_LINK(routeTitles[routeName], pathname);

  return (
    <Link
      href={routeMap[routeName]}
      className={styles.link}
      onClick={() => trackClick(event)}
    >
      {children}
    </Link>
  );
}
