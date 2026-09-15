import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faChartSimple,
  faClock,
  faCreditCard,
  faLaptop,
  faListCheck,
  faTag,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import styles from './CourseSidebar.module.scss';

// Semantic keys the course pages pass, mapped to one icon set.
const courseIcons = {
  time: faClock,
  lessons: faListCheck,
  semesters: faCalendarDays,
  people: faUsers,
  price: faTag,
  payment: faCreditCard,
  level: faChartSimple,
  place: faLaptop,
};

function CourseDetails({ items }) {
  return (
    <div className={styles.widget}>
      <h2 className={styles.widgetTitle}>W skrócie</h2>
      <ul className={styles.detailsList}>
        {items.map(({ title, content, icon }) => (
          <li key={`${title}_${content}`}>
            <span className={styles.detailLabel}>
              <FontAwesomeIcon icon={courseIcons[icon] ?? faListCheck} />
              {title}
            </span>
            <span className={styles.detailValue}>{content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
