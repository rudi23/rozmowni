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
import courseGroupImage from '../../../public/images/course-group.jpg';

export default function CoursesGroup() {
  return (
    <>
      <PageHeader
        breadcrumb
        title="Kursy grupowe"
        lede="Zajęcia w małej grupie, z naciskiem na swobodną rozmowę."
      />
      <CourseLayout
        sidebar={
          <CourseSidebar
            image={courseGroupImage}
            imageAlt="Grupa uczniów podczas lekcji angielskiego"
            price="1650 zł"
            enrollEvent={events.GROUP_COURSE_CLICK_ENROLL}
            courseDetails={[
              {
                title: 'Czas:',
                content: '2 lekcje tygodniowo (90 min.)',
                icon: 'time',
              },
              {
                title: 'Liczba lekcji:',
                content: '30 w semestrze',
                icon: 'lessons',
              },
              {
                title: 'Liczba semestrów:',
                content: '2 semestry',
                icon: 'semesters',
              },
              {
                title: 'Liczba osób:',
                content: '2-3 osoby w grupie',
                icon: 'people',
              },
              {
                title: 'Płatność:',
                content: 'za semestr z góry',
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
        <CourseHeader title="Zajęcia grupowe z języka angielskiego">
          <p>
            Celem kursu jest ćwiczenie swobodnego komunikowania się, poszerzenie
            słownictwa i wprowadzenie lub powtórzenie gramatyki
          </p>
        </CourseHeader>

        <CourseInfo
          items={['Lekcje raz w tygodniu', 'Zajęcia trwają 90 min (2 lekcje)']}
        />

        <>
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
                      Konwersacje są to zajęcia w całości poświęcone na
                      ćwiczenie umiejętności mówienia w języku obcym. Mają na
                      celu utrwalenie poznanego słownictwa i struktur
                      gramatycznych oraz przede wszystkim pozbycie się "bariery
                      językowej".
                    </p>
                    <p>
                      Konwersacje są prowadzone nie tylko przez polskich
                      lektorów, lecz także przez rodowitych Anglików lub
                      Amerykanów (Native Speakers).
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
                      itp. Dodatkowo na zajęciach wprowadzane są elementy
                      Business English co daje uczniom praktyczną wiedzę z tego
                      zakresu.
                    </p>
                    <p>
                      Uczestnicy kursu również sami wybierają interesujące ich
                      tematy dyskusji. Dzięki temu uczniowie, którzy mają
                      możliwość współtworzyć lekcje, z zaangażowaniem
                      uczestniczą w zajęciach. Zdobywają oni cenną umiejętność
                      negocjowania, relacjonowania wydarzeń a nawet targowania
                      się w obcym języku.
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
                title: 'Business English',
                id: '3',
                content: (
                  <>
                    <p>
                      Kurs ten skierowany jest do osób posługujących się
                      językiem angielskim w pracy.
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
        </>

        <section className="course-prose">
          <h3 className="course-section-title">Dla kogo jest kurs grupowy</h3>
          <p>
            Dla dorosłych i młodzieży na poziomach od A2 do C2, którzy chcą
            regularnie mówić po angielsku w małej grupie – z osobami o podobnym
            poziomie, ale różnych doświadczeniach, dzięki czemu zawsze jest o
            czym rozmawiać. Grupy dobieramy poziomem, więc zanim się zapiszesz,
            zrób{' '}
            <CourseLink routeName={routeNames.TEST}>
              bezpłatny test poziomujący
            </CourseLink>
            .
          </p>

          <h3 className="course-section-title">Jak wyglądają zajęcia</h3>
          <p>
            Spotykamy się raz w tygodniu na 90 minut (dwie lekcje), online przez
            Zoom, Google Meet lub Teams. Semestr to 30 godzin lekcyjnych; kurs
            trwa dwa semestry, od października do połowy czerwca. Na zajęciach
            przede wszystkim rozmawiamy – o artykułach, nagraniach i tematach,
            które sami wybieracie – a słownictwo i gramatykę wprowadzamy lub
            powtarzamy w kontekście tych rozmów. Konwersacje prowadzą polscy
            lektorzy i native speakerzy z{' '}
            <CourseLink routeName={routeNames.ABOUT_US}>
              zespołu Rozmowni.pl
            </CourseLink>
            .
          </p>

          <h3 className="course-section-title">Cena i zapisy</h3>
          <p>
            Kurs kosztuje 1650 zł za semestr, płatne z góry. Szczegóły i dane do
            przelewu znajdziesz w{' '}
            <CourseLink routeName={routeNames.PRICING}>cenniku</CourseLink>.
            Zapisy przyjmujemy przez{' '}
            <CourseLink routeName={routeNames.CONTACT}>
              formularz kontaktowy
            </CourseLink>{' '}
            – po zgłoszeniu odezwiemy się, żeby dobrać grupę do Twojego poziomu.
          </p>

          <CourseFAQ
            id="groupFaq"
            items={[
              {
                question: 'Ile osób jest w grupie?',
                answer:
                  'Grupy są małe – od dwóch do czterech osób – tak, żeby każdy mówił na każdych zajęciach.',
              },
              {
                question: 'Jak długo trwa kurs i kiedy startuje?',
                answer:
                  'Kurs trwa dwa semestry, od października do połowy czerwca; w semestrze jest 30 godzin lekcyjnych, po jednym 90-minutowym spotkaniu w tygodniu.',
              },
              {
                question: 'Na jakim poziomie muszę być?',
                answer: (
                  <>
                    Kursy prowadzimy na poziomach od A2 do C2. Jeśli nie znasz
                    swojego poziomu, zrób{' '}
                    <CourseLink routeName={routeNames.TEST}>
                      bezpłatny test poziomujący
                    </CourseLink>{' '}
                    – zajmuje 10 minut, a wynik widzisz od razu.
                  </>
                ),
              },
              {
                question: 'Jak płacę?',
                answer: (
                  <>
                    Za semestr z góry, przelewem. Dane do przelewu są w{' '}
                    <CourseLink routeName={routeNames.PRICING}>
                      cenniku
                    </CourseLink>
                    .
                  </>
                ),
              },
              {
                question: 'Czy mogę wybrać rodzaj kursu?',
                answer:
                  'Tak – do wyboru są konwersacje, General English i Business English (opisy wyżej). Konwersacje możesz mieć także z native speakerem.',
              },
            ]}
          />

          <RelatedCourses current={routeNames.GROUP_COURSE} />
        </section>
      </CourseLayout>
    </>
  );
}
