import PageHeader from '../../components/PageHeader';
import CourseFAQ from '../../components/CourseFAQ';
import CourseLink from '../../components/CourseLink';
import RelatedCourses from '../../components/RelatedCourses';
import { routeNames } from '../../routes';
import Accordion from '../../components/Accordion';
import { events } from '../../services/tracking';
import CourseSidebar from '../../components/CourseSidebar';
import CourseHeader from '../../components/CourseHeader';
import CourseInfo from '../../components/CourseInfo';
import CourseLayout from '../../components/CourseLayout';
import courseIndividualImage from '../../../public/images/course-individual.jpg';

export default function CoursesIndividual() {
  return (
    <>
      <PageHeader
        breadcrumb
        title="Kursy indywidualne"
        lede="Lekcje jeden na jeden, dopasowane do Twojego tempa, celów i grafiku."
      />

      <CourseLayout
        sidebar={
          <CourseSidebar
            image={courseIndividualImage}
            imageAlt="Nauczycielka z kawą przy stoliku"
            price="120 zł"
            enrollEvent={events.INDIVIDUAL_COURSE_CLICK_ENROLL}
            thumbClassName="bg-white"
            courseDetails={[
              {
                title: 'Czas',
                content: '45 min.',
                icon: 'time',
              },
              {
                title: 'Koszt:',
                content: '120 zł',
                icon: 'price',
              },
              {
                title: 'Płatność:',
                content: 'za miesiąc z góry',
                icon: 'payment',
              },
              {
                title: 'Poziom:',
                content: 'A2, B1, B2, C1, C2',
                icon: 'level',
              },
              {
                title: 'Gdzie:',
                content: 'Nauka on-line',
                icon: 'place',
              },
            ]}
          />
        }
      >
        <CourseHeader title="Zajęcia indywidualne z języka angielskiego">
          <p>
            Lekcje indywidualne można porównać do usługi szycia dokładnie na
            Twoją miarę. Podczas zajęć indywidualnych cała uwaga nauczyciela
            jest skupiona tylko na Tobie i Twoich potrzebach. Materiał
            dostosowany jest do Ciebie, Twojego tempa, interesujących Cię
            tematów i materiałów, które trafią do Ciebie najlepiej. Możemy
            skupić się na konwersacjach, powtórce gramatyki lub ćwiczyć
            angielski biznesowy.
          </p>
        </CourseHeader>

        <CourseInfo
          items={[
            'Lekcje raz, dwa lub trzy razy w tygodniu',
            'Dni oraz godziny spotkań dopasowane do Twojego planu zajęć',
            'Spotkania 7:00-22:00 przez 6 dni w tygodniu',
            'Płatność za miesiąc z góry',
          ]}
        />

        <h3 className="course-section-title">Rodzaje zajęć</h3>
        <p>Możesz zdecydować się na jeden z czterech rodzajów zajęć:</p>

        <Accordion
          openFirstOnDesktop
          id="individualTypes"
          cards={[
            {
              title: 'Konwersacje',
              id: '1',
              content: (
                <>
                  <p>
                    Konwersacje są to zajęcia w całości poświęcone na ćwiczenie
                    umiejętności mówienia w języku obcym. Mają na celu
                    utrwalenie poznanego słownictwa i struktur gramatycznych
                    oraz przede wszystkim pozbycie się "bariery językowej".
                  </p>
                  <p>
                    Konwersacje są prowadzone nie tylko przez polskich lektorów,
                    lecz także przez rodowitych Anglików lub Amerykanów (Native
                    Speakers).
                  </p>
                  <p>
                    Uczestnicy kursu nabywają pewności siebie i swobodnie
                    używają języka obcego.
                  </p>
                  <p>
                    Ćwiczymy również scenki 'z życia wzięte' czyli wszystkie
                    prawdopodobne sytuacje, w których można się znaleźć
                    wyjeżdżając za granice np. pytanie o drogę, zamawianie
                    jedzenia w restauracji, na lotnisku, w hotelu, u lekarza
                    itp. Dodatkowo na zajęciach wprowadzane są elementy Business
                    English co daje uczniom praktyczną wiedzę z tego zakresu.
                  </p>
                  <p>
                    Uczestnicy kursu również sami wybierają interesujące ich
                    tematy dyskusji. Dzięki temu uczniowie, którzy mają
                    możliwość współtworzyć lekcje, z zaangażowaniem uczestniczą
                    w zajęciach. Zdobywają oni cenną umiejętność negocjowania,
                    relacjonowania wydarzeń a nawet targowania się w obcym
                    języku.
                  </p>
                  <p>
                    Stopień trudności i tematy na kursie konwersacji są
                    dopasowane do wieku i stopnia zaawansowania językowego
                    uczniów.
                  </p>
                </>
              ),
            },
            {
              title: 'General English',
              id: '2',
              content: (
                <>
                  <p>
                    Celem kursu jest rozwój wszystkich sprawności językowych
                    (mówienia, czytania, słuchania oraz pisania).
                  </p>
                  <p>
                    Dzięki temu kursant osiąga swobodę w porozumiewanie się w
                    języku angielskim oraz jest przygotowany do kontynuowania
                    nauki na wyższych poziomach w celu przygotowania do
                    egzaminów FCE, CAE i CPE.
                  </p>
                </>
              ),
            },
            {
              title: 'Przygotowanie do egzaminu',
              id: '3',
              content: (
                <>
                  <p>
                    Rezultatem kursu jest przygotowanie do egzaminu ósmoklasisty
                    lub egzaminu maturalnego
                  </p>
                </>
              ),
            },
            {
              title: 'Business English',
              id: '4',
              content: (
                <>
                  <p>
                    Kurs ten skierowany jest do osób posługujących się językiem
                    angielskim w pracy.
                  </p>
                  <p>
                    Program zajęć obejmuje naukę słownictwa tematycznego,
                    pisania formalnych dokumentów oraz konwersacje biznesowe.
                  </p>
                </>
              ),
            },
          ]}
        />

        {/* Who it is for, how a lesson looks, price, FAQ - the questions people
            search for before they book. */}
        <section className="course-prose">
          <h3 className="course-section-title">
            Dla kogo są lekcje indywidualne
          </h3>
          <p>
            Dla dorosłych i młodzieży, którzy chcą uczyć się we własnym tempie i
            na własnych warunkach: wracasz do angielskiego po latach,
            potrzebujesz języka w pracy, przygotowujesz się do egzaminu albo do
            wyjazdu. Pracujemy na poziomach od A2 do C2. Jeśli nie wiesz, gdzie
            jesteś, zrób{' '}
            <CourseLink routeName={routeNames.TEST}>
              bezpłatny test poziomujący
            </CourseLink>{' '}
            – zajmuje 10 minut, a wynik widzisz od razu.
          </p>

          <h3 className="course-section-title">Jak wygląda lekcja</h3>
          <p>
            Lekcja trwa 45 minut i odbywa się online przez Zoom, Google Meet lub
            Teams. Spotykamy się raz, dwa lub trzy razy w tygodniu, w dni i
            godziny dopasowane do Twojego kalendarza – między 7:00 a 22:00,
            sześć dni w tygodniu. Materiał dobieramy do Twoich celów: artykuły i
            nagrania jako punkt wyjścia do rozmowy, a gramatykę i słownictwo
            tam, gdzie są potrzebne.
          </p>
          <p>
            Zajęcia prowadzą lektorzy{' '}
            <CourseLink routeName={routeNames.ABOUT_US}>
              zespołu Rozmowni.pl
            </CourseLink>{' '}
            – polscy nauczyciele i native speakerzy; konwersacje możesz mieć z
            jednymi i drugimi.
          </p>

          <h3 className="course-section-title">Cena i zapisy</h3>
          <p>
            Lekcja indywidualna kosztuje 120 zł za 45 minut, płatne za miesiąc z
            góry. Pełne zestawienie cen znajdziesz w{' '}
            <CourseLink routeName={routeNames.PRICING}>cenniku</CourseLink>.
            Zapisy przyjmujemy przez{' '}
            <CourseLink routeName={routeNames.CONTACT}>
              formularz kontaktowy
            </CourseLink>{' '}
            – odezwiemy się, żeby ustalić poziom i terminy. Możesz też zacząć od
            bezpłatnej lekcji próbnej po teście.
          </p>

          <CourseFAQ
            id="individualFaq"
            items={[
              {
                question: 'Jak często mogę mieć lekcje?',
                answer:
                  'Raz, dwa lub trzy razy w tygodniu – ustalamy to razem, w dni i godziny dopasowane do Twojego planu, między 7:00 a 22:00, sześć dni w tygodniu.',
              },
              {
                question: 'Jak płacę za lekcje?',
                answer: (
                  <>
                    Za miesiąc z góry, przelewem. Dane do przelewu znajdziesz w{' '}
                    <CourseLink routeName={routeNames.PRICING}>
                      cenniku
                    </CourseLink>
                    .
                  </>
                ),
              },
              {
                question: 'Czego potrzebuję, żeby zacząć?',
                answer:
                  'Komputera lub smartfona z kamerą, słuchawek z mikrofonem i dostępu do internetu. Zajęcia odbywają się przez Zoom, Google Meet lub Teams.',
              },
              {
                question: 'Nie znam swojego poziomu – co zrobić?',
                answer: (
                  <>
                    Zrób{' '}
                    <CourseLink routeName={routeNames.TEST}>
                      bezpłatny test poziomujący
                    </CourseLink>
                    : 25 pytań, około 10 minut, wynik od A1 do C2 od razu na
                    ekranie. Po teście zapraszamy na bezpłatną, 30-minutową
                    lekcję próbną, na której porozmawiamy o Twoich celach i
                    dobierzemy rodzaj zajęć.
                  </>
                ),
              },
              {
                question: 'Czy lekcje indywidualne przygotowują do egzaminów?',
                answer:
                  'Tak. Jednym z rodzajów zajęć jest przygotowanie do egzaminu ósmoklasisty lub matury, a w ramach General English pracujemy też w stronę certyfikatów Cambridge (FCE, CAE, CPE).',
              },
            ]}
          />

          <RelatedCourses current={routeNames.INDIVIDUAL_COURSE} />
        </section>
      </CourseLayout>
    </>
  );
}
