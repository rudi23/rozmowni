import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import styles from './TrustPoints.module.scss';

// The short reassurance line that sits under a call to action.
// Pass variant="light" when it runs on a coloured or dark section.
function TrustPoints({
  items,
  variant = 'default',
  align = 'start',
  className,
}) {
  return (
    <ul
      className={cx(
        styles.root,
        {
          [styles.light]: variant === 'light',
          [styles.center]: align === 'center',
        },
        className,
      )}
    >
      {items.map((item) => (
        <li key={item}>
          <FontAwesomeIcon icon={faCheck} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default TrustPoints;
