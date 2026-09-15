import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faBullseye,
  faGem,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import Section from './Section';
import SectionHeading from './SectionHeading';
import TrustPoints from './TrustPoints';
import styles from './TestBenefits.module.scss';

const benefits = [
  {
    icon: faChartSimple,
    title: 'Wynik testu',
    description:
      'Twój poziom językowy w skali A1–C2, od razu po zakończeniu testu',
  },
  {
    icon: faGem,
    title: 'Bezpłatna lekcja próbna',
    description:
      '30-minutowa indywidualna lekcja online z doświadczonym lektorem',
  },
  {
    icon: faBullseye,
    title: 'Spersonalizowany plan',
    description:
      'Ścieżka rozwoju przygotowana podczas lekcji próbnej, dopasowana do Twojego poziomu i celów',
  },
  {
    icon: faBook,
    title: 'E-book „Czas na angielski”',
    description:
      '12-stronicowy przewodnik po wszystkich czasach angielskich z przykładami',
  },
];

export default function TestBenefits() {
  const trackClick = useClickTracking();

  return (
    <Section>
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <SectionHeading
            heading="Co zyskujesz dzięki bezpłatnemu testowi?"
            subheading="Pakiet startowy"
          />
          <p className={styles.intro}>
            Test zajmuje 10 minut, a poza wynikiem dostajesz wszystko, czego
            potrzebujesz, żeby zacząć naukę.
          </p>
        </div>
      </div>

      <ul className={styles.grid}>
        {benefits.map(({ icon, title, description }) => (
          <li className={styles.benefit} key={title}>
            <FontAwesomeIcon icon={icon} className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
          </li>
        ))}
      </ul>

      <div className={styles.cta}>
        <Link
          href={routeMap[routeNames.TEST]}
          className={`btn btn-main ${styles.mainCta}`}
          onClick={() => trackClick(events.HOME_TEST_BENEFITS_CLICK_TEST)}
        >
          Zrób bezpłatny test
        </Link>
        <TrustPoints
          align="center"
          className={styles.guarantee}
          items={['Bez opłat', 'Bez zobowiązań']}
        />
      </div>
    </Section>
  );
}
