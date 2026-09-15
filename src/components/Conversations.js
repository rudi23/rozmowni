import conversationsImage from '../../public/images/conversations.jpg';
import SectionHeading from './SectionHeading';
import Section from './Section';
import styles from './Conversations.module.scss';
import ResponsiveImage from './ResponsiveImage';

const topicGroups = [
  {
    title: 'Poziom podstawowy',
    level: 'A1–A2',
    topics: [
      'Poznawanie nowych osób',
      'Sytuacje na lotnisku i w hotelu',
      'Zamawianie jedzenia w restauracji',
      'Wizyta u lekarza',
    ],
  },
  {
    title: 'Poziom średnio zaawansowany',
    level: 'B1–B2',
    topics: [
      'Wpływ social media na życie',
      'Edukacja jako broń',
      'Stereotypy krajów',
      'Katastrofy nuklearne',
    ],
  },
  {
    title: 'Poziom zaawansowany',
    level: 'C1–C2',
    topics: [
      'TED talks i dyskusje',
      'Filozofia dobrego życia',
      'Testy osobowości',
      'Prywatność vs monitoring',
    ],
  },
];

export default function Conversations() {
  return (
    <Section id="conversations">
      <div className="row">
        <div className="col-12">
          <div className={styles.textWithFloatingImage}>
            <SectionHeading heading="Konwersacje" subheading="Jak uczymy?" />

            <div className={styles.floatingImage}>
              <ResponsiveImage
                src={conversationsImage}
                alt="Konwersacje w grupie"
                placeholder="blur"
                sizes="(min-width: 1200px) 350px, (min-width: 992px) 300px, (min-width: 768px) 250px, calc(100vw-30px)"
                quality="75"
              />
            </div>

            <p>
              Specjalizujemy się w nauczaniu angielskiego praktycznego, z dużym
              naciskiem na ćwiczenie konwersacji. Na zajęciach korzystamy nie
              tylko z podręczników, ale także oglądamy ciekawe filmiki i gramy w
              gry po angielsku, ćwiczymy nowe słownictwo, przydatne zwroty oraz
              zagadnienia gramatyczne. Od pierwszych zajęć staramy się aby
              uczniowie jak najwięcej mówili po angielsku.
            </p>

            <p>
              Tematy konwersacji są dobrane do poziomu, wieku oraz zainteresowań
              uczniów.
            </p>

            <p>
              Aby dać Ci lepsze pojęcie o tym, jak wyglądają nasze zajęcia,
              przedstawiamy przykładowe tematy, które omawiamy w zależności od
              poziomu zaawansowania:
            </p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3 className={styles.topicsHeading}>Tematy konwersacji</h3>

          <div className={styles.topicGroups}>
            {topicGroups.map(({ title, level, topics }) => (
              <div className={styles.topicGroup} key={title}>
                <h4 className={styles.groupTitle}>
                  {title}
                  <span className={styles.level}>{level}</span>
                </h4>
                <ul className={styles.chips}>
                  {topics.map((topic) => (
                    <li className={styles.chip} key={topic}>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
