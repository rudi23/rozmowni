import Link from 'next/link';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import styles from './PricingCards.module.scss';

// What people compare — hours, group size, how payment works — used to be
// folded away behind an accordion row. The cards show it outright.
export default function PricingCards({ cards }) {
  const trackClick = useClickTracking();

  return (
    <ul className={styles.grid}>
      {cards.map(({ name, price, unit, items }) => (
        <li className={styles.card} key={name}>
          <h3 className={styles.name}>{name}</h3>

          <p className={styles.price}>
            <span className={styles.amount}>{price}</span>
            <span className={styles.unit}>{unit}</span>
          </p>

          <ul className={styles.points}>
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Link
            href={routeMap[routeNames.CONTACT]}
            className={styles.cta}
            onClick={() => trackClick(events.PRICING_CLICK_ENROLL(name))}
          >
            Zapisz się
          </Link>
        </li>
      ))}
    </ul>
  );
}
