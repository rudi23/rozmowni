import styles from './SectionHeading.module.scss';

export default function SectionHeading({ heading, subheading }) {
  return (
    <div className={styles.root}>
      {subheading && <span className={styles.subheading}>{subheading}</span>}
      <h2 className={styles.heading}>{heading}</h2>
    </div>
  );
}
