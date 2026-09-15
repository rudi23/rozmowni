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
  function renderItem({ title, content, icon }) {
    return (
      <li key={`${title}_${content}`}>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <FontAwesomeIcon icon={courseIcons[icon] ?? faListCheck} />
            {title}
          </span>
          {content}
        </div>
      </li>
    );
  }

  return (
    <div className="course-widget course-details-info">
      <h3 className="course-title">W skrócie</h3>
      <ul>{items.map(renderItem)}</ul>
    </div>
  );
}

export default CourseDetails;
