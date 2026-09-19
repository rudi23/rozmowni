import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faEnvelope,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames, routeTitles } from '../../routes';
import PageHeader from '../PageHeader';
import Section from '../Section';
import SectionHeading from '../SectionHeading';
import TrustPoints from '../TrustPoints';
import TestFAQ from '../TestFAQ';
import styles from './TestIntroView.module.scss';

const testVersions = [
  {
    type: 'teens',
    title: 'Test dla młodzieży',
    meta: '11–16 lat · 25 pytań',
  },
  {
    type: 'adults',
    title: 'Test dla dorosłych',
    meta: '17+ lat · 25 pytań',
  },
];

const afterTest = [
  {
    icon: faChartSimple,
    title: 'Twój poziom na piśmie',
    description: 'Wynik w skali A1–C2 wraz z opisem, do którego możesz wrócić',
  },
  {
    icon: faEnvelope,
    title: 'Bezpłatna lekcja próbna',
    description: 'Zaproszenie na 30-minutową lekcję online z lektorem',
  },
  {
    icon: faBook,
    title: 'E-book „Czas na angielski”',
    description: '12-stronicowy przewodnik po wszystkich czasach angielskich',
  },
];

const TestIntroView = ({ onTestSelection }) => {
  const trackClick = useClickTracking();
  const courseLink = (routeName, label) => (
    <Link
      href={routeMap[routeName]}
      onClick={() =>
        trackClick(events.TEST_INTRO_CLICK_COURSE(routeTitles[routeName]))
      }
    >
      {label}
    </Link>
  );

  return (
    <>
      <PageHeader
        title="Test poziomujący"
        lede="Wynik otrzymasz od razu po teście, a zaproszenie na bezpłatną lekcję próbną oraz e-book wyślemy na Twój adres e-mail."
        ledeMobileHidden
      />

      <Section>
        <div className={styles.chooser}>
          <TrustPoints
            className={styles.facts}
            items={['10 minut', 'Poziomy A1–C2', 'Bezpłatny']}
          />

          <h2 className={styles.chooserHeading}>Wybierz wersję testu</h2>
          <p className={styles.chooserNote}>
            Pytania są dostosowane do wieku — wybierz właściwą wersję.
          </p>

          <div className={styles.testOptions}>
            {testVersions.map(({ type, title, meta }) => (
              <button
                type="button"
                className={styles.testOption}
                key={type}
                onClick={() => onTestSelection(type)}
              >
                <span className={styles.optionTitle}>{title}</span>
                <span className={styles.optionMeta}>{meta}</span>
                <span className={styles.optionCta}>Zacznij test</span>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className={styles.afterTestSection}>
          <SectionHeading subheading="Po teście" heading="Co otrzymasz" />
          <ul className={styles.afterTest}>
            {afterTest.map(({ icon, title, description }) => (
              <li className={styles.afterTestItem} key={title}>
                <FontAwesomeIcon icon={icon} className={styles.afterTestIcon} />
                <h3 className={styles.afterTestTitle}>{title}</h3>
                <p className={styles.afterTestText}>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* What the test is and is not - the page used to have one paragraph of
          its own text, the rest was buttons. */}
      <Section>
        <div className={styles.about}>
          <SectionHeading
            subheading="O teście"
            heading="Jak działa test poziomujący"
          />
          <p>
            Test składa się z 25 pytań jednokrotnego wyboru i sprawdza
            gramatykę, słownictwo oraz rozumienie prostych sytuacji
            komunikacyjnych na poziomach od A1 do C2 według europejskiej skali
            CEFR. Są dwie wersje – dla młodzieży (11–16 lat) i dla dorosłych
            (17+) – różniące się tematyką pytań. Wypełnienie zajmuje około 10
            minut.
          </p>
          <p>
            Wynik wraz z opisem poziomu zobaczysz od razu na ekranie. Jeśli
            zostawisz adres e-mail, wyślemy zapis wyniku, e-book „Czas na
            angielski” i zaproszenie na bezpłatną, 30-minutową lekcję próbną
            online, na której porozmawiamy o Twoich celach i ustalimy plan
            nauki.
          </p>
          <p>
            Test to punkt startowy, nie egzamin. Mówienia nie da się sprawdzić
            testem wyboru, dlatego robimy to razem na lekcji próbnej, a na jej
            podstawie proponujemy{' '}
            {courseLink(routeNames.INDIVIDUAL_COURSE, 'lekcje indywidualne')}{' '}
            albo {courseLink(routeNames.GROUP_COURSE, 'kurs w małej grupie')} na
            Twoim poziomie.
          </p>
        </div>
      </Section>

      <TestFAQ showCta={false} background="gray" />
    </>
  );
};

export default TestIntroView;
