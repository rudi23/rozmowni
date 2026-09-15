import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import Section from './Section';
import styles from './Opinions.module.scss';
import SectionHeading from './SectionHeading';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Opinions() {
  const [openStates, setOpenStates] = useState({});
  const trackClick = useClickTracking();
  const { pathname } = useRouter();

  function ReadMoreButton({ opinionIndex }) {
    return (
      !openStates[opinionIndex] && (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpenStates((prev) => ({
              ...prev,
              [opinionIndex]: !prev[opinionIndex],
            }));
          }}
          aria-label="Przeczytaj pełną opinię"
        >
          przeczytaj więcej &gt;&gt;
        </a>
      )
    );
  }

  function ReadMoreText({ children, opinionIndex }) {
    return (
      <div
        className="more"
        style={{ display: openStates[opinionIndex] ? 'block' : 'none' }}
        aria-expanded={openStates[opinionIndex] ? 'true' : 'false'}
      >
        {children}
      </div>
    );
  }

  const opinions = [
    {
      author: 'Magdalena Groń',
      content: (opinionIndex) => (
        <Fragment>
          <p>
            3 lata temu zdecydowałam, że chciałabym odświeżyć swój angielski i
            wreszcie po tylu latach móc swobodnie posługiwać się tym językiem.
            Wybór padł na szkołę Gosi. Z perspektywy czasu wiem, że to była
            najlepsza decyzja jaką mogłam podjąć 😊
          </p>
          <p>
            Gosia prowadzi lekcje w taki sposób, że po prostu chcesz w nich
            uczestniczyć i się angażować. Na lekcjach poruszamy wszystkie
            możliwe tematy, czytamy artykuły z gazet o których później
            dyskutujemy, oglądamy różne filmiki o bardzo różnorodnej tematyce,
            począwszy od tych bardzo zabawnych, a kończąc na tych bardzo
            poważnych. Także nie zawsze ulubiona gramatyka podana jest w sposób
            bardzo zrozumiały i lekki, a co najważniejsze skuteczny.{' '}
            <ReadMoreButton opinionIndex={opinionIndex} />
          </p>
          <ReadMoreText opinionIndex={opinionIndex}>
            <p>
              Gosia skupia się na potrzebach swoich studentów, na początku
              zawsze pyta na czym im najbardziej zależy jeśli chodzi o naukę
              języka. To Ty możesz mieć duży wpływ na to jakie tematy poruszane
              są na lekcjach. Oprócz tego wszystkiego Gosia jest super osobą -
              uśmiechnięta, wesołą, z dużym poczuciem humoru i empatią. I co
              najważniejsze jest skuteczna 😊 Ja po lekcjach z Gosią wreszcie
              nie boję się mówić po angielsku, a wręcz przeciwnie sprawia mi to
              przyjemność i chce więcej i więcej 😉Polecam z całego serca!
            </p>
            <p>
              Ja oprócz postępów w języku zyskałam osobę, z którą cotygodniowe
              lekcje angielskiego są jak kawa z przyjaciółką... tylko po
              angielsku 😉 i nie mogę już sobie wyobrazić tygodnia bez tego
              spotkania 😊
            </p>
          </ReadMoreText>
        </Fragment>
      ),
    },
    {
      author: 'Łukasz Skotarczak',
      content: () => (
        <p>
          Od pół roku z chęcią uczęszczam na indywidualne zajęcia do Małgorzaty.
          Zajęcia odbywają się na zasadzie konwersacji i każda lekcja dopasowana
          jest do moich potrzeb. Lekcje są ciekawe i praktyczne z wykorzystaniem
          sytuacji, które często spotykamy w codziennym życiu. Z każdą lekcją
          czuje się bardziej pewny siebie w rozmowach po angielsku, co jeszcze
          bardziej motywuje mnie do dalszej nauki. Gorąco polecam każdemu, kto
          chce się skutecznie nauczyć języka angielskiego.
        </p>
      ),
    },
    {
      author: 'Paulina Badan',
      content: (opinionIndex) => (
        <Fragment>
          <p>
            Od listopada ubiegłego roku biorę udział w zajęciach indywidualnych
            – językowych z Gosią. Bardzo cenię sobie profesjonalizm w nauczaniu
            i serdeczną atmosferę na zajęciach!
          </p>
          <p>
            Gosia w trakcie zajęć wychodzi poza schematy, wplata w naukę wiele
            ciekawych informacji i w twórczy sposób motywuje do dalszej pracy.
            Swobodna konwersacja jest świetnym pretekstem do szlifowania
            praktycznych umiejętności językowych, a ćwiczenia gramatyczne
            zobrazowane są ciekawymi przykładami, które pomagają w opanowaniu
            nowych, ale i starych (pokrytych kurzem niepamięci) wiadomości.{' '}
            <ReadMoreButton opinionIndex={opinionIndex} />
          </p>
          <ReadMoreText opinionIndex={opinionIndex}>
            <p>
              Dla mnie, to duża dawka świeżości w dotychczasowej nauce języka
              obcego, a metodyka nauczenia, którą proponuje Gosia jest świetna!
              Pozwala na nowo odkryć radość z używania języka angielskiego.
            </p>
            <p>Polecam serdecznie! 👍</p>
          </ReadMoreText>
        </Fragment>
      ),
    },
    {
      author: 'Aleksandra Bańka',
      content: () => (
        <Fragment>
          <p>
            Moim marzeniem było MÓWIĆ po angielsku. Kiedyś miałam z tym duży
            problem. Postanowiłam zapisać się na lekcje angielskiego, aby
            pokonać lęk! I to była najlepsza decyzja w moim życiu. Trafiłam na
            Panią Małgosię. Na zajęciach duuużo rozmawiałyśmy, dosłownie na
            każdy temat, co pozwoliło mi przy okazji wzbogacić słownictwo. 🥰
          </p>
          <p>Polecam z całego serca. ❤️</p>
        </Fragment>
      ),
    },
  ];

  function renderOpinion({ author, content }, index) {
    return (
      <div className={styles.root} key={author}>
        <div className={styles.content}>
          <div className={styles.quote}>
            <FontAwesomeIcon icon={faQuoteLeft} aria-hidden="true" />
          </div>
          {typeof content === 'function' ? content(index) : content}
          <div className={styles.author}>{author}</div>
        </div>
      </div>
    );
  }

  return (
    <Section background="gray">
      <SectionHeading heading="Opinie" subheading="Jak nas widzą?" />
      <div className="row justify-content-center testimonials">
        <div className="col-lg-12">
          <Carousel
            autoPlay={false}
            responsive={responsive}
            swipeable={true}
            draggable={false}
            showDots={true}
            keyBoardControl={true}
            containerClass="carousel-container"
            removeArrowOnDeviceType={['tablet', 'mobile']}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {opinions.map(renderOpinion)}
          </Carousel>
        </div>
      </div>

      {/* Google Reviews Link */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-8 text-center">
          <div className={styles.googleReviews}>
            <p className={styles.googleText}>
              Sprawdź więcej opinii naszych uczniów na Google
            </p>
            <a
              href="https://search.google.com/local/reviews?placeid=ChIJRfTrnfxbFkcRCtSKA73F6g0"
              onClick={() =>
                trackClick(events.OPINIONS_CLICK_GOOGLE_REVIEWS(pathname))
              }
              target="_blank"
              rel="noopener noreferrer"
              className={styles.googleLink}
            >
              <FontAwesomeIcon icon={faGoogle} aria-hidden="true" />
              Zobacz opinie na Google
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}
