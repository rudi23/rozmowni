import { routeMap, routeNames } from '../routes';
import CourseLink from './CourseLink';
import styles from './RelatedCourses.module.scss';

const courses = [
  [routeNames.INDIVIDUAL_COURSE, 'Zajęcia indywidualne'],
  [routeNames.GROUP_COURSE, 'Kursy grupowe'],
  [routeNames.EXAM_8_COURSE, 'Kurs do egzaminu ósmoklasisty'],
  [routeNames.MATURA_EXAM_COURSE, 'Kurs maturalny'],
];

// Links between the course pages, so they are reachable from each other's
// copy and not only from the menu.
export default function RelatedCourses({ current }) {
  const others = courses.filter(
    ([routeName]) => routeName !== current && routeMap[routeName],
  );

  return (
    <>
      <h3 className="course-section-title">Zobacz też</h3>
      <ul className={styles.list}>
        {others.map(([routeName, label]) => (
          <li key={routeName}>
            <CourseLink routeName={routeName}>{label}</CourseLink>
          </li>
        ))}
      </ul>
    </>
  );
}
