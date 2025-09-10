import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faChartBar,
  faBullseye,
  faGift,
  faClipboardList,
  faEnvelope,
  faBook,
  faUserGraduate,
  faUser,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../PageHeader';
import Section from '../Section';
import SectionHeading from '../SectionHeading';
import styles from './TestIntroView.module.scss';

const TestIntroView = ({ onTestSelection }) => {
  return (
    <>
      <PageHeader title="Test poziomujący" />

      <Section>
        <div className={styles.heroSection}>
          <SectionHeading
            subheading="Bezpłatny test"
            heading="Sprawdź swój poziom angielskiego za darmo!"
          />
          <p className={styles.heroDescription}>
            Nasz test poziomujący to szybki i skuteczny sposób na określenie
            Twojego aktualnego poziomu znajomości języka angielskiego. Na
            podstawie wyniku otrzymasz spersonalizowane rekomendacje dotyczące
            dalszej nauki.
          </p>
        </div>
      </Section>

      <Section background="gray">
        <div className={styles.featuresSection}>
          <SectionHeading
            subheading="Dlaczego nasz test"
            heading="Szybko, dokładnie, za darmo"
          />
          <div className={styles.testFeatures}>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faClock} className={styles.featureIcon} />
              <span>Tylko 10 minut</span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon
                icon={faChartBar}
                className={styles.featureIcon}
              />
              <span>Natychmiastowy wynik</span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon
                icon={faBullseye}
                className={styles.featureIcon}
              />
              <span>Poziom A1-C2</span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faGift} className={styles.featureIcon} />
              <span>100% darmowy</span>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className={styles.bonusSection}>
          <SectionHeading
            subheading="Dodatkowe korzyści"
            heading="Co otrzymasz po teście"
          />
          <div className={styles.bonusInfo}>
            <ul>
              <li>
                <FontAwesomeIcon icon={faClipboardList} />
                Określenie poziomu (A1-C2)
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                Zaproszenie na bezpłatną lekcję próbną
              </li>
              <li>
                <FontAwesomeIcon icon={faBook} />
                Darmowy e-book "Czas na angielski"
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className={styles.selectionContainer}>
          <SectionHeading
            subheading="Rozpocznij test"
            heading="Wybierz odpowiedni test"
          />
          <p className={styles.selectionDescription}>
            Test jest dostosowany do Twojego wieku - wybierz właściwą wersję:
          </p>

          <div className={styles.testOptions}>
            <div
              className={styles.testOption}
              onClick={() => onTestSelection('teens')}
            >
              <div className={styles.testIcon}>
                <FontAwesomeIcon icon={faUserGraduate} />
              </div>
              <h3>Test dla młodzieży</h3>
              <p>Wiek: 11-16 lat</p>
              <p>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={styles.inlineIcon}
                />
                25 pytań
              </p>
              <button className={styles.selectButton}>Wybierz</button>
            </div>
            <div
              className={styles.testOption}
              onClick={() => onTestSelection('adults')}
            >
              <div className={styles.testIcon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3>Test dla dorosłych</h3>
              <p>Wiek: 17+ lat</p>
              <p>
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className={styles.inlineIcon}
                />
                25 pytań
              </p>
              <button className={styles.selectButton}>Wybierz</button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default TestIntroView;
