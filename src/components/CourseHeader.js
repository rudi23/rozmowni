import styles from './CourseHeader.module.scss';

export default function CourseHeader({ title, children }) {
  return (
    <header className={styles.root}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </header>
  );
}
