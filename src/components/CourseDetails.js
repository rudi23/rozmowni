export default function CourseDetails({ items }) {
  function renderItem({ title, content, icon }) {
    return (
      <li key={`${title}_${content}`}>
        <div className="d-flex justify-content-between align-items-center">
          <span>
            <i className={`bi bi-${icon}`} />
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
