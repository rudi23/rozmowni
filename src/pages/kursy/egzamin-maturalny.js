import PageHeader from '../../components/PageHeader';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import CourseSidebar from '../../components/CourseSidebar';
import CourseHeader from '../../components/CourseHeader';
import CourseInfo from '../../components/CourseInfo';
import CourseLayout from '../../components/CourseLayout';
import courseGroupImage from '../../../public/images/course-group.jpg';

export default function CoursesMaturaExam() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Egzamin maturalny" />
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
                                icon: 'alarm-clock',
                            },
                            {
                                title: 'Liczba lekcji:',
                                content: '26 w semestrze',
                                icon: 'refresh-time',
                            },
                            {
                                title: 'Liczba semestrów:',
                                content: '2 semestry',
                                icon: 'calendar',
                            },
                            {
                                title: 'Liczba osób:',
                                content: '3-4 osoby w grupie',
                                icon: 'group',
                            },
                            {
                                title: 'Płatność:',
                                content: 'za semestr z góry',
                                icon: 'money-bag',
                            },
                            {
                                title: 'Poziom:',
                                content: 'podst. lub rozszerzony',
                                icon: 'graph-bar',
                            },
                            {
                                title: 'Gdzie:',
                                content: 'Nauka on-line',
                                icon: 'location-pointer',
                            },
                        ]}
                    />
                }
            >
                <CourseHeader title="Zajęcia grupowe z języka angielskiego">
                    <p>
                        Czy zbliża się termin Twojego egzaminu maturalnego z języka angielskiego, a Ty chcesz się
                        solidnie i skutecznie przygotować?
                    </p>
                    <p>Nasz kurs jest stworzony, aby pomóc Ci osiągnąć sukces w tej ważnej próbie!</p>

                    <p>Co oferujemy w ramach naszego kursu?</p>

                    <ul className="mb-2">
                        <li>
                            Doświadczeni nauczyciele: Nasz zespół nauczycieli to eksperci w dziedzinie nauczania języka
                            angielskiego, którzy posiadają wieloletnie doświadczenie w przygotowywaniu uczniów do
                            egzaminów maturalnych.
                        </li>
                        <li>
                            Indywidualne podejście: Rozumiemy, że każdy maturzysta ma własne mocne strony i obszary do
                            poprawy. Dlatego nasz kurs jest dostosowany do Twojego poziomu, potrzeb i celów, zapewniając
                            indywidualne podejście.
                        </li>
                        <li>
                            Materiały egzaminacyjne: Udostępniamy najnowsze materiały egzaminacyjne, testy próbne,
                            arkusze zadań i przykładowe odpowiedzi, które pomogą Ci oswoić się z formatem egzaminu.
                        </li>
                        <li>
                            Intensywne ćwiczenia: Nasze zajęcia koncentrują się na praktycznym wykorzystaniu języka
                            angielskiego. Pracujemy nad umiejętnościami rozumienia ze słuchu, czytania, mówienia i
                            pisania, a także nad strategiami egzaminacyjnymi.
                        </li>
                        <li>
                            Wsparcie przy pisaniu prac: Pomagamy w tworzeniu i doskonaleniu prac pisemnych, zapewniając
                            feedback i wskazówki, które pomogą Ci zdobyć jak najwyższą ocenę na egzaminie.
                        </li>
                        <li>
                            Przyjazna atmosfera: Nasze zajęcia odbywają się w przyjaznej atmosferze, sprzyjającej
                            koncentracji i motywacji do nauki.
                        </li>
                        <li>
                            Elastyczny harmonogram: Dostosowujemy się do Twojego planu, abyś mógł uczęszczać na zajęcia
                            w dogodnych dla Ciebie godzinach.
                        </li>
                        <li>
                            Śledzenie postępów: Regularnie oceniamy Twoje postępy i dostarczamy Ci informacje zwrotne,
                            dzięki czemu będziesz wiedział/a, na czym jeszcze musisz popracować.
                        </li>
                        <li>
                            Przygotowanie psychologiczne: Pomagamy Ci radzić sobie ze stresem przed egzaminem i
                            pracujemy nad poprawą pewności siebie.
                        </li>
                    </ul>
                    <p>
                        Zapisz się na nasz kurs przygotowawczy do egzaminu maturalnego z języka angielskiego i zwiększ
                        swoje szanse na uzyskanie wysokiej oceny!
                    </p>
                    <p>
                        Skontaktuj się z nami już teraz, aby dowiedzieć się więcej o naszym kursie, dostępnych terminach
                        i cenie.
                    </p>
                    <p>Razem osiągniemy Twój cel maturalny!</p>
                </CourseHeader>

                <CourseInfo items={['Lekcje raz w tygodniu', 'Zajęcia trwają 90 min (2 lekcje)']} />
            </CourseLayout>
        </>
    );
}
