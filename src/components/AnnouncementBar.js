import styles from './AnnouncementBar.module.scss';

// A quiet notice above the bar, on every page. It used to be a full section
// with a photo and six paragraphs repeating the home page, dropped between
// the title and the content of the individual course page.
export default function AnnouncementBar() {
  return (
    <aside className={styles.bar}>
      <div className="container">
        <p className={styles.text}>
          <strong>Zapisy na rok szkolny 2026/2027 są otwarte.</strong> Kursy
          prowadzimy online, na wszystkich poziomach zaawansowania.
        </p>
      </div>
    </aside>
  );
}
