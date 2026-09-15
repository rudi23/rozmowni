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
    <section className={`feature-2 ${styles.featuresSection}`}>
      <div className="container">
        <div className="row no-gutters">
          {features.map(({ icon, title, description }) => (
            <div className="col-lg-3 col-md-6" key={title}>
              <div className="feature-item feature-style-2">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="feature-text">
                  <h4>{title}</h4>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
