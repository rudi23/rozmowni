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

export default function Courses8Exam() {
  return (
    <>
      <PageHeader
        breadcrumb
        title="Egzamin ósmoklasisty"
        lede="Roczny kurs przygotowujący do egzaminu ósmoklasisty z języka angielskiego."
      />
      <CourseLayout
        sidebar={
          <CourseSidebar
            image={courseGroupImage}
            imageAlt="Grupa uczniów podczas lekcji angielskiego"
            price="1430 zł"
            enrollEvent={events.EXAM_8_COURSE_CLICK_ENROLL}
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
            Czy Twój ósmoklasista/Twoja ósmoklasistka zbliża się do ważnego
            egzaminu z języka angielskiego? Czy szukasz profesjonalnej pomocy w
            przygotowaniach do tego kluczowego testu?
          </p>
          <p>Nasz kurs przygotowawczy to idealne rozwiązanie!</p>
          <p>Czego możesz się spodziewać po naszym kursie?</p>
          <ul className="mb-2">
            <li>
              <strong>Doświadczeni nauczyciele:</strong> Nasz zespół składa się
              z doświadczonych nauczycieli języka angielskiego, którzy posiadają
              bogate doświadczenie w przygotowywaniu uczniów do egzaminów.
            </li>
            <li>
              <strong>Indywidualne podejście:</strong> Rozumiemy, że każdy uczeń
              jest inny i ma różne potrzeby. Nasz kurs jest dostosowany do
              poziomu i wymagań każdego uczestnika, zapewniając indywidualne
              podejście do nauki.
            </li>
            <li>
              <strong>Materiały egzaminacyjne:</strong> Oferujemy dostęp do
              najnowszych materiałów egzaminacyjnych, testów próbnych i zadań,
              które pomogą uczniom oswoić się z formatem egzaminu.
            </li>
            <li>
              <strong>Ćwiczenia praktyczne:</strong> Nasze zajęcia skupiają się
              na praktycznym wykorzystaniu języka angielskiego. Uczniowie będą
              mieli okazję do rozwijania swoich umiejętności rozumienia ze
              słuchu, czytania, mówienia i pisania.
            </li>
            <li>
              <strong>Wsparcie psychologiczne:</strong> Rozumiemy, że egzamin
              może być stresujący, dlatego oferujemy także wsparcie
              psychologiczne, które pomoże uczniom radzić sobie ze stresem i
              poprawić ich pewność siebie.
            </li>
            <li>
              <strong>Elastyczny harmonogram:</strong> Nasze zajęcia odbywają
              się w dogodnych godzinach, aby umożliwić uczniom dostosowanie
              nauki do swojego planu dnia.
            </li>
            <li>
              <strong>Śledzenie postępów:</strong> Regularnie oceniamy postępy
              uczniów i dostarczamy informacje zwrotne, dzięki czemu każdy uczeń
              wie, nad czym musi jeszcze popracować.
            </li>
            <li>
              <strong>Przyjazna atmosfera:</strong> Nasze zajęcia odbywają się w
              przyjaznej i motywującej atmosferze, co sprzyja efektywnej nauce.
            </li>
          </ul>
          <p>
            Zapisz swojego ósmoklasistę na nasz kurs przygotowawczy do egzaminu
            z języka angielskiego i daj mu najlepszą szansę na osiągnięcie
            sukcesu!
          </p>
          <p>
            Skontaktuj się z nami już dziś, aby dowiedzieć się więcej o naszym
            kursie i dostępnych terminach.
          </p>
          <p>
            Wspólnie pomożemy Twojemu dziecku osiągnąć swoje cele edukacyjne.
          </p>
        </CourseHeader>

        <CourseInfo
          items={['Lekcje raz w tygodniu', 'Zajęcia trwają 90 min (2 lekcje)']}
        />

        <section className="course-prose">
          <h3 className="course-section-title">Dla kogo jest kurs</h3>
          <p>
            Dla uczniów klasy ósmej, którzy chcą podejść do egzaminu z języka
            angielskiego pewnie i bez stresu. Pracujemy w grupach 3–4 osób
            dobranych poziomem, więc każdy ma czas na mówienie i indywidualną
            informację zwrotną. Poziom dziecka najłatwiej sprawdzić{' '}
            <CourseLink routeName={routeNames.TEST}>
              testem poziomującym dla młodzieży
            </CourseLink>{' '}
            (11–16 lat, 25 pytań, około 10 minut).
          </p>

          <h3 className="course-section-title">Jak wyglądają zajęcia</h3>
          <p>
            Raz w tygodniu 90 minut (dwie lekcje), online przez Zoom, Google
            Meet lub Teams. Kurs jest roczny: dwa semestry po 26 godzin
            lekcyjnych, od października do połowy marca. Ćwiczymy zadania ze
            wszystkich części arkusza – słuchanie, czytanie, środki językowe i
            wypowiedź pisemną – na materiałach egzaminacyjnych i testach
            próbnych, a postępy regularnie omawiamy z uczniem.
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
            . Po zgłoszeniu ustalimy poziom i termin zajęć.
          </p>

          <CourseFAQ
            id="exam8Faq"
            items={[
              {
                question: 'Kiedy zaczyna się kurs i jak długo trwa?',
                answer:
                  'Zajęcia ruszają w październiku i trwają do połowy marca: dwa semestry po 26 godzin lekcyjnych, raz w tygodniu po 90 minut.',
              },
              {
                question: 'Ile osób jest w grupie?',
                answer: '3–4 osoby, dobrane poziomem językowym.',
              },
              {
                question: 'Jak sprawdzić poziom dziecka?',
                answer: (
                  <>
                    <CourseLink routeName={routeNames.TEST}>
                      Bezpłatnym testem poziomującym
                    </CourseLink>{' '}
                    w wersji dla młodzieży (11–16 lat): 25 pytań, około 10
                    minut, wynik od razu. Po teście zapraszamy na bezpłatną
                    lekcję próbną.
                  </>
                ),
              },
              {
                question: 'Czy zajęcia są online?',
                answer:
                  'Tak, w całości – przez Zoom, Google Meet lub Teams. Potrzebny jest komputer lub smartfon z kamerą, słuchawki z mikrofonem i dostęp do internetu.',
              },
              {
                question: 'Jak płacę?',
                answer: (
                  <>
                    Za semestr z góry, przelewem. Dane do przelewu znajdziesz w{' '}
                    <CourseLink routeName={routeNames.PRICING}>
                      cenniku
                    </CourseLink>
                    .
                  </>
                ),
              },
            ]}
          />

          <RelatedCourses current={routeNames.EXAM_8_COURSE} />
        </section>
      </CourseLayout>
    </>
  );
}
