import PageHeader from '../../components/PageHeader';
import CourseFAQ from '../../components/CourseFAQ';
import CourseLink from '../../components/CourseLink';
import RelatedCourses from '../../components/RelatedCourses';
import { routeNames } from '../../routes';
import { events } from '../../services/tracking';
import CourseSidebar from '../../components/CourseSidebar';
import CourseHeader from '../../components/CourseHeader';
import CourseInfo from '../../components/CourseInfo';
import CourseLayout from '../../components/CourseLayout';
import courseGroupImage from '../../../public/images/course-group.jpg';

export default function CoursesMaturaExam() {
  return (
    <>
      <PageHeader
        breadcrumb
        title="Egzamin maturalny"
        lede="Roczny kurs przygotowujący do matury z języka angielskiego."
      />
      <CourseLayout
        sidebar={
          <CourseSidebar
            image={courseGroupImage}
            imageAlt="Grupa uczniów podczas lekcji angielskiego"
            price="1430 zł"
            enrollEvent={events.MATURA_EXAM_COURSE_CLICK_ENROLL}
            courseDetails={[
              {
                title: 'Czas:',
                content: '2 lekcje tygodniowo (90 min.)',
                icon: 'time',
              },
              {
                title: 'Liczba lekcji:',
                content: '26 w semestrze',
                icon: 'lessons',
              },
              {
                title: 'Liczba semestrów:',
                content: '2 semestry',
                icon: 'semesters',
              },
              {
                title: 'Liczba osób:',
                content: '3-4 osoby w grupie',
                icon: 'people',
              },
              {
                title: 'Płatność:',
                content: 'za semestr z góry',
                icon: 'payment',
              },
              {
                title: 'Poziom:',
                content: 'podst. lub rozszerzony',
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
            Czy zbliża się termin Twojego egzaminu maturalnego z języka
            angielskiego, a Ty chcesz się solidnie i skutecznie przygotować?
          </p>
          <p>
            Nasz kurs jest stworzony, aby pomóc Ci osiągnąć sukces w tej ważnej
            próbie!
          </p>

          <p>Co oferujemy w ramach naszego kursu?</p>

          <ul className="mb-2">
            <li>
              Doświadczeni nauczyciele: Nasz zespół nauczycieli to eksperci w
              dziedzinie nauczania języka angielskiego, którzy posiadają
              wieloletnie doświadczenie w przygotowywaniu uczniów do egzaminów
              maturalnych.
            </li>
            <li>
              Indywidualne podejście: Rozumiemy, że każdy maturzysta ma własne
              mocne strony i obszary do poprawy. Dlatego nasz kurs jest
              dostosowany do Twojego poziomu, potrzeb i celów, zapewniając
              indywidualne podejście.
            </li>
            <li>
              Materiały egzaminacyjne: Udostępniamy najnowsze materiały
              egzaminacyjne, testy próbne, arkusze zadań i przykładowe
              odpowiedzi, które pomogą Ci oswoić się z formatem egzaminu.
            </li>
            <li>
              Intensywne ćwiczenia: Nasze zajęcia koncentrują się na praktycznym
              wykorzystaniu języka angielskiego. Pracujemy nad umiejętnościami
              rozumienia ze słuchu, czytania, mówienia i pisania, a także nad
              strategiami egzaminacyjnymi.
            </li>
            <li>
              Wsparcie przy pisaniu prac: Pomagamy w tworzeniu i doskonaleniu
              prac pisemnych, zapewniając feedback i wskazówki, które pomogą Ci
              zdobyć jak najwyższą ocenę na egzaminie.
            </li>
            <li>
              Przyjazna atmosfera: Nasze zajęcia odbywają się w przyjaznej
              atmosferze, sprzyjającej koncentracji i motywacji do nauki.
            </li>
            <li>
              Elastyczny harmonogram: Dostosowujemy się do Twojego planu, abyś
              mógł uczęszczać na zajęcia w dogodnych dla Ciebie godzinach.
            </li>
            <li>
              Śledzenie postępów: Regularnie oceniamy Twoje postępy i
              dostarczamy Ci informacje zwrotne, dzięki czemu będziesz
              wiedział/a, na czym jeszcze musisz popracować.
            </li>
            <li>
              Przygotowanie psychologiczne: Pomagamy Ci radzić sobie ze stresem
              przed egzaminem i pracujemy nad poprawą pewności siebie.
            </li>
          </ul>
          <p>
            Zapisz się na nasz kurs przygotowawczy do egzaminu maturalnego z
            języka angielskiego i zwiększ swoje szanse na uzyskanie wysokiej
            oceny!
          </p>
          <p>
            Skontaktuj się z nami już teraz, aby dowiedzieć się więcej o naszym
            kursie, dostępnych terminach i cenie.
          </p>
          <p>Razem osiągniemy Twój cel maturalny!</p>
        </CourseHeader>

        <CourseInfo
          items={['Lekcje raz w tygodniu', 'Zajęcia trwają 90 min (2 lekcje)']}
        />

        <section className="course-prose">
          <h3 className="course-section-title">Dla kogo jest kurs</h3>
          <p>
            Dla maturzystów, którzy zdają angielski na poziomie podstawowym lub
            rozszerzonym i chcą przygotować się systematycznie, a nie w ostatnim
            miesiącu. Grupy liczą 3–4 osoby i są dobierane poziomem oraz
            wybranym zakresem egzaminu. Swój poziom sprawdzisz w 10 minut{' '}
            <CourseLink routeName={routeNames.TEST}>
              bezpłatnym testem poziomującym
            </CourseLink>
            .
          </p>

          <h3 className="course-section-title">Jak wyglądają zajęcia</h3>
          <p>
            Raz w tygodniu 90 minut (dwie lekcje), online przez Zoom, Google
            Meet lub Teams, od października do połowy marca: dwa semestry po 26
            godzin lekcyjnych. Pracujemy na arkuszach maturalnych i
            przykładowych odpowiedziach – słuchanie, czytanie, środki językowe i
            wypowiedź pisemna – z regularną informacją zwrotną do prac pisemnych
            i strategiami rozwiązywania zadań.
          </p>

          <h3 className="course-section-title">Cena i zapisy</h3>
          <p>
            Kurs kosztuje 1430 zł za semestr, płatne z góry (razem 52 godziny
            lekcyjne w roku). Szczegóły znajdziesz w{' '}
            <CourseLink routeName={routeNames.PRICING}>cenniku</CourseLink>,
            zapisy przyjmujemy przez{' '}
            <CourseLink routeName={routeNames.CONTACT}>
              formularz kontaktowy
            </CourseLink>
            . Po zgłoszeniu ustalimy poziom, zakres egzaminu i termin zajęć.
          </p>

          <CourseFAQ
            id="maturaFaq"
            items={[
              {
                question: 'Czy kurs obejmuje poziom rozszerzony?',
                answer:
                  'Tak – przygotowujemy do matury na poziomie podstawowym i rozszerzonym; grupę dobieramy do wybranego zakresu.',
              },
              {
                question: 'Kiedy zaczyna się kurs i jak długo trwa?',
                answer:
                  'Zajęcia ruszają w październiku i trwają do połowy marca: dwa semestry po 26 godzin lekcyjnych, raz w tygodniu po 90 minut.',
              },
              {
                question: 'Ile osób jest w grupie?',
                answer: '3–4 osoby, dobrane poziomem i zakresem egzaminu.',
              },
              {
                question: 'Jak sprawdzić swój poziom?',
                answer: (
                  <>
                    <CourseLink routeName={routeNames.TEST}>
                      Bezpłatnym testem poziomującym
                    </CourseLink>{' '}
                    w wersji dla dorosłych (17+): 25 pytań, około 10 minut,
                    wynik od razu na ekranie.
                  </>
                ),
              },
              {
                question: 'Czy mogę przygotowywać się indywidualnie?',
                answer: (
                  <>
                    Tak – przygotowanie do matury jest też jednym z rodzajów{' '}
                    <CourseLink routeName={routeNames.INDIVIDUAL_COURSE}>
                      lekcji indywidualnych
                    </CourseLink>{' '}
                    (45 minut, 120 zł, terminy pod Twój plan).
                  </>
                ),
              },
            ]}
          />

          <RelatedCourses current={routeNames.MATURA_EXAM_COURSE} />
        </section>
      </CourseLayout>
    </>
  );
}
