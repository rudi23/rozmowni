import styles from './Section.module.scss';

export default function Section({ children, background, id }) {
    const backgroundColor = background === 'gray' ? '#F5F7FA' : undefined;

    return (
        <section className={styles.section} style={{ background: backgroundColor }} id={id}>
            <div className="container">{children}</div>
        </section>
    );
}
