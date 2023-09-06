import cx from 'classnames';
import Link from 'next/link';
import { routeMap, routeNames } from '../routes';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import styles from './Notification.module.scss';

export default function Notification({ showLink = false }) {
    const trackClick = useClickTracking();

    return showLink ? (
        <Link href={routeMap[routeNames.CONTACT]}>
            <a
                className={cx('tn', 'btn-main', 'btn-block', 'p-3', 'w-100', styles.notification)}
                onClick={() => trackClick(events.NOTIFCATION_CLICK)}
            >
                Napisz do nas, odbierz BEZPŁATNĄ LEKCJĘ angielskiego on-line
            </a>
        </Link>
    ) : (
        <div className={cx('p-3', 'w-100', styles.notification)}>
            Napisz do nas, odbierz BEZPŁATNĄ LEKCJĘ angielskiego on-line
        </div>
    );
}
