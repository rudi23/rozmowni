import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { routeMap, routeNames } from '../routes';
import styles from './PageHeader.module.scss';

function PageHeader({
  title,
  lede,
  breadcrumb = false,
  ledeMobileHidden = false,
}) {
  return (
    <section className={`page-header ${styles.root}`}>
      <div className="container">
        {breadcrumb && (
          <nav className={styles.breadcrumb} aria-label="Ścieżka nawigacji">
            <Link href={routeMap[routeNames.HOME]}>Strona główna</Link>
            <FontAwesomeIcon icon={faChevronRight} aria-hidden="true" />
            <span aria-current="page">{title}</span>
          </nav>
        )}
        <h1>{title}</h1>
        {lede && (
          <p
            className={cx(styles.lede, {
              [styles.ledeMobileHidden]: ledeMobileHidden,
            })}
          >
            {lede}
          </p>
        )}
      </div>
    </section>
  );
}

export default PageHeader;
