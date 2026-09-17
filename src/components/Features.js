import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComments,
  faNewspaper,
  faHeadset,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Features.module.scss';

const features = [
  {
    icon: faComments,
    title: 'Konwersacje',
    description: 'Rozwój osobisty, psychologia, relacje i wiedza o świecie',
  },
  {
    icon: faNewspaper,
    title: 'Ciekawe zajęcia',
    description:
      'Dyskusje o kontrowersyjnych tematach, które rozwijają krytyczne myślenie',
  },
  {
    icon: faHeadset,
    title: 'Nauczanie on-line',
    description:
      'Zajęcia zdalne z dowolnego miejsca przez Zoom lub Google Meet',
  },
  {
    icon: faRocket,
    title: 'Szybkie efekty',
    description: 'Skuteczne metody, które szybko przełożysz na praktykę',
  },
];

function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        {/* The strip has no visible title; the heading keeps the outline
            h1 -> h2 -> h3 for assistive tech and crawlers. */}
        <h2 className="visually-hidden">Co nas wyróżnia</h2>
        <ul className={styles.grid}>
          {features.map(({ icon, title, description }) => (
            <li className={styles.item} key={title}>
              <FontAwesomeIcon icon={icon} className={styles.icon} />
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.description}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Features;
