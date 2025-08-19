import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function CourseInfo({ items, className = '' }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`single-course-details ${className}`}>
      <div className="course-widget course-info">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <FontAwesomeIcon icon={faCheck} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
