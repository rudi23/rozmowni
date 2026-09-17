import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faCheck,
  faHeart,
  faBrain,
  faUsers,
  faGraduationCap,
  faEarthEurope,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import whyUsImage from '../../public/images/why-us.jpg';
import SectionHeading from './SectionHeading';
import Section from './Section';
import Accordion from './Accordion';
import styles from './WhyUsExpanded.module.scss';
import ResponsiveImage from './ResponsiveImage';

export default function WhyUsExpanded() {
  const trackClick = useClickTracking();

  const whyUsItems = [
    {
      title: 'Ciekawe tematy konwersacji',
      icon: faBrain,
      id: '1',
      content: (
        <>
          <p>
            <strong>
              Szkoła rozmowni.pl jest dla Ciebie, jeśli chcesz rozmawiać po
              angielsku na tematy, które naprawdę mają znaczenie:
            </strong>
          </p>
          <div className={styles.topicCards}>
            <div className={styles.topicCard}>
              <div className={styles.cardHeader}>
                <FontAwesomeIcon icon={faBrain} className={styles.cardIcon} />
                <h5 className={styles.cardTitle}>Rozwój osobisty</h5>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.topicTag}>Psychologia</span>
                <span className={styles.topicTag}>Coaching</span>
                <span className={styles.topicTag}>Filozofia</span>
              </div>
            </div>

            <div className={styles.topicCard}>
              <div className={styles.cardHeader}>
                <FontAwesomeIcon icon={faUsers} className={styles.cardIcon} />
                <h5 className={styles.cardTitle}>Relacje</h5>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.topicTag}>Komunikacja</span>
                <span className={styles.topicTag}>Zaufanie</span>
                <span className={styles.topicTag}>Empatia</span>
              </div>
            </div>

            <div className={styles.topicCard}>
              <div className={styles.cardHeader}>
                <FontAwesomeIcon
                  icon={faEarthEurope}
                  className={styles.cardIcon}
                />
                <h5 className={styles.cardTitle}>Świat wokół nas</h5>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.topicTag}>Zdrowy styl życia</span>
                <span className={styles.topicTag}>Bieżące wydarzenia</span>
                <span className={styles.topicTag}>Różne kultury</span>
              </div>
            </div>
          </div>
          <p className={styles.highlight}>
            <strong>
              Na zajęciach często rozmawiamy na tematy kontrowersyjne
            </strong>{' '}
            z poszanowaniem poglądów innych rozmówców.
          </p>
        </>
      ),
    },
    {
      title: 'Kompetencje przyszłości',
      icon: faGraduationCap,
      id: '2',
      content: (
        <>
          <p>
            <strong>
              Uczymy się angielskiego i równocześnie ćwiczymy umiejętności,
              które będą potrzebne w przyszłości:
            </strong>
          </p>
          <div className={styles.skillsList}>
            <div className={styles.skill}>
              <FontAwesomeIcon icon={faHeart} className={styles.skillIcon} />
              <div>
                <h5>Radzenie sobie z emocjami</h5>
                <p>Przełamywanie bariery językowej, pokonywanie wstydu</p>
              </div>
            </div>
            <div className={styles.skill}>
              <FontAwesomeIcon icon={faBrain} className={styles.skillIcon} />
              <div>
                <h5>Kreatywność i ciekawość</h5>
                <p>Poznawanie różnych kultur i sposobów myślenia</p>
              </div>
            </div>
            <div className={styles.skill}>
              <FontAwesomeIcon icon={faUsers} className={styles.skillIcon} />
              <div>
                <h5>Efektywna komunikacja</h5>
                <p>Dyskusje, konwersacje i autentyczne relacje</p>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Przyjazna atmosfera bez stresu',
      icon: faHeart,
      id: '3',
      content: (
        <>
          <p>
            <strong>Szkoła rozmowni.pl jest dla Ciebie, jeśli:</strong>
          </p>
          <div className={styles.atmosphereFeatures}>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faCheck} />
              <span>
                Odpowiada Ci przyjazna atmosfera bez szkolnych ocen i testów
              </span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faCheck} />
              <span>Cenisz wsparcie i uśmiech podczas nauki</span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faCheck} />
              <span>
                Chcesz otworzyć się, popełniać błędy i eksperymentować
              </span>
            </div>
            <div className={styles.feature}>
              <FontAwesomeIcon icon={faCheck} />
              <span>Preferujesz naukę online z dowolnego miejsca</span>
            </div>
          </div>
        </>
      ),
    },
    {
      title: 'Motywacja do rozwoju',
      icon: faPlay,
      id: '4',
      content: (
        <>
          <p>
            <strong>
              Szkoła rozmowni.pl jest dla Ciebie, jeśli przygotowujesz się do:
            </strong>
          </p>
          <div className={styles.motivationCards}>
            <div className={styles.motivationCard}>
              <div className={styles.cardHeader}>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className={styles.cardIcon}
                />
                <h5 className={styles.cardTitle}>Egzaminów</h5>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.topicTag}>Egzamin ósmoklasisty</span>
                <span className={styles.topicTag}>Matura</span>
                <span className={styles.topicTag}>Cambridge (B2 First)</span>
                <span className={styles.topicTag}>Studia zagraniczne</span>
              </div>
            </div>

            <div className={styles.motivationCard}>
              <div className={styles.cardHeader}>
                <FontAwesomeIcon icon={faRocket} className={styles.cardIcon} />
                <h5 className={styles.cardTitle}>Celów życiowych</h5>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.topicTag}>Praca marzeń</span>
                <span className={styles.topicTag}>Lepsze oceny</span>
                <span className={styles.topicTag}>Podróże bez ograniczeń</span>
                <span className={styles.topicTag}>Osobisty rozwój</span>
              </div>
            </div>
          </div>
          <p className={styles.motivationFooter}>
            <strong>
              Niezależnie od Twojej motywacji - z chęcią będziemy Ci towarzyszyć
              w drodze do upragnionej płynności językowej.
            </strong>
          </p>
        </>
      ),
    },
  ];

  return (
    <Section background="gray" id="dlaczego-my">
      <div className="row">
        <div className="col-12">
          <div className={styles.textWithFloatingImage}>
            <SectionHeading
              heading="Rozmowni.pl – tu nauczysz się mówić po angielsku"
              subheading="Poznajmy się"
            />

            <div className={styles.imageFloat}>
              <ResponsiveImage
                src={whyUsImage}
                alt="Małgorzata Rudowska przysłuchująca się uczniom podczas zajęć angielskiego"
                placeholder="blur"
                sizes="(min-width: 1200px) 350px, (min-width: 992px) 300px, (min-width: 768px) 250px, calc(100vw-30px)"
                quality="75"
              />
            </div>

            <div className={styles.introText}>
              <p>
                Skoro tu jesteś, to pewnie ktoś Ci nas polecił albo samodzielnie
                znalazłeś nas, szukając szkoły, w której wreszcie zaczniesz
                swobodnie mówić po angielsku.
              </p>
              <p>
                W Rozmowni.pl uczysz się języka tak, jak używa się go w
                prawdziwym życiu — w rozmowie. Rozmawiamy o tym, co Cię
                interesuje i inspiruje: rozwoju osobistym, psychologii,
                filozofii, relacjach, zdrowym stylu życia, kulturach świata czy
                bieżących wydarzeniach. Podejmujemy też tematy kontrowersyjne —
                zawsze z szacunkiem dla innych punktów widzenia.
              </p>
              <p>
                Niezależnie, czy uczysz się do egzaminu, przygotowujesz do pracy
                marzeń, czy chcesz swobodnie podróżować — pomożemy Ci osiągnąć
                Twój cel.
              </p>
              <p>
                Wszystko w przyjaznej atmosferze, z dużą dawką wsparcia i
                motywacji.
              </p>
              <p className={styles.goodMatch}>
                <strong>
                  Gotowy na rozpoczęcie przygody z angielskim? Sprawdź szczegóły
                  naszej oferty poniżej!
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Expanded Details */}
      <div className="row mt-3">
        <div className="col-12">
          <div className={styles.expandedSection}>
            <h3 className={styles.expandedTitle}>
              Poznaj nas lepiej - sprawdź szczegóły:
            </h3>

            <Accordion
              id="whyUsExpanded"
              cards={whyUsItems.map((item) => ({
                title: (
                  <span className={styles.accordionTitle}>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={styles.titleIcon}
                    />
                    {item.title}
                  </span>
                ),
                id: item.id,
                content: item.content,
              }))}
            />

            <div className={styles.finalCta}>
              <p>
                <strong>Brzmi jak coś dla Ciebie?</strong>
              </p>
              <Link
                href={routeMap[routeNames.TEST]}
                className={`btn btn-main ${styles.finalCtaButton}`}
                onClick={() =>
                  trackClick(events.HOME_WHY_US_EXPANDED_BOTTOM_CLICK_TEST)
                }
              >
                Zrób test i przekonaj się sam
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
