import Notification from './Notification';
import styles from './PageHeader.module.scss';

export default function PageHeader({ title, showNotification = true, notificationLink = true }) {
    return (
        <>
            {showNotification && <Notification showLink={notificationLink} />}
            <section className={styles.root}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1>{title}</h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
