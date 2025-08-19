export default function CourseHeader({ title, children, className = '' }) {
  return (
    <div className={`course-single-header ${className}`}>
      <h2 className="single-course-title">{title}</h2>
      {children}
    </div>
  );
}
