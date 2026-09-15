import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import styles from './CourseInfo.module.scss';

export default function CourseInfo({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.grid}>
      {items.map((item) => (
        <li className={styles.tile} key={item}>
          <FontAwesomeIcon icon={faCheck} className={styles.icon} />
          {item}
        </li>
      ))}
    </ul>
  );
}
