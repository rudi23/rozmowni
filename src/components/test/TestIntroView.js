import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartSimple,
  faEnvelope,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../PageHeader';
import Section from '../Section';
import SectionHeading from '../SectionHeading';
import TrustPoints from '../TrustPoints';
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
  return (
    <>
      <PageHeader
        title="Test poziomujący"
        lede="Wynik, zaproszenie na bezpłatną lekcję próbną i e-book wyślemy na Twój adres e-mail."
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
    </>
  );
};

export default TestIntroView;
