import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../components/PageHeader';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import CourseRequirements from '../../components/CourseRequirements';
import CourseDetails from '../../components/CourseDetails';
import courseGroupImage from '../../../public/images/course-group.jpg';
import styles from './Course.module.scss';

export default function CoursesMaturaExam() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Egzamin maturalny" />

            <section className={styles.root}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="course-single-header">
                                <h2 className="single-course-title">Zajęcia grupowe z języka angielskiego</h2>
                                <p>
                                    Czy zbliża się termin Twojego egzaminu maturalnego z języka angielskiego, a Ty
                                    chcesz się solidnie i skutecznie przygotować?
                                </p>
                                <p>Nasz kurs jest stworzony, aby pomóc Ci osiągnąć sukces w tej ważnej próbie!</p>

                                <p>Co oferujemy w ramach naszego kursu?</p>

                                <ul className="mb-2">
                                    <li>
                                        Doświadczeni nauczyciele: Nasz zespół nauczycieli to eksperci w dziedzinie
                                        nauczania języka angielskiego, którzy posiadają wieloletnie doświadczenie w
                                        przygotowywaniu uczniów do egzaminów maturalnych.
                                    </li>
                                    <li>
                                        Indywidualne podejście: Rozumiemy, że każdy maturzysta ma własne mocne strony i
                                        obszary do poprawy. Dlatego nasz kurs jest dostosowany do Twojego poziomu,
                                        potrzeb i celów, zapewniając indywidualne podejście.
                                    </li>
                                    <li>
                                        Materiały egzaminacyjne: Udostępniamy najnowsze materiały egzaminacyjne, testy
                                        próbne, arkusze zadań i przykładowe odpowiedzi, które pomogą Ci oswoić się z
                                        formatem egzaminu.
                                    </li>
                                    <li>
                                        Intensywne ćwiczenia: Nasze zajęcia koncentrują się na praktycznym wykorzystaniu
                                        języka angielskiego. Pracujemy nad umiejętnościami rozumienia ze słuchu,
                                        czytania, mówienia i pisania, a także nad strategiami egzaminacyjnymi.
                                    </li>
                                    <li>
                                        Wsparcie przy pisaniu prac: Pomagamy w tworzeniu i doskonaleniu prac pisemnych,
                                        zapewniając feedback i wskazówki, które pomogą Ci zdobyć jak najwyższą ocenę na
                                        egzaminie.
                                    </li>
                                    <li>
                                        Przyjazna atmosfera: Nasze zajęcia odbywają się w przyjaznej atmosferze,
                                        sprzyjającej koncentracji i motywacji do nauki.
                                    </li>
                                    <li>
                                        Elastyczny harmonogram: Dostosowujemy się do Twojego planu, abyś mógł uczęszczać
                                        na zajęcia w dogodnych dla Ciebie godzinach.
                                    </li>
                                    <li>
                                        Śledzenie postępów: Regularnie oceniamy Twoje postępy i dostarczamy Ci
                                        informacje zwrotne, dzięki czemu będziesz wiedział/a, na czym jeszcze musisz
                                        popracować.
                                    </li>
                                    <li>
                                        Przygotowanie psychologiczne: Pomagamy Ci radzić sobie ze stresem przed
                                        egzaminem i pracujemy nad poprawą pewności siebie.
                                    </li>
                                </ul>
                                <p>
                                    Zapisz się na nasz kurs przygotowawczy do egzaminu maturalnego z języka angielskiego
                                    i zwiększ swoje szanse na uzyskanie wysokiej oceny!
                                </p>
                                <p>
                                    Skontaktuj się z nami już teraz, aby dowiedzieć się więcej o naszym kursie,
                                    dostępnych terminach i cenie.
                                </p>
                                <p>Razem osiągniemy Twój cel maturalny!</p>
                            </div>

                            <div className="single-course-details">
                                <div className="course-widget course-info">
                                    <ul>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} />
                                            Lekcje raz w tygodniu
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} />
                                            Zajęcia trwają 90 min (2 lekcje)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="course-sidebar">
                                <div className="course-single-thumb">
                                    <Image
                                        src={courseGroupImage}
                                        alt="Grupa uczniów podczas lekcji angielskiego"
                                        placeholder="blur"
                                        layout="responsive"
                                        sizes="(min-width: 1200px) 318px, (min-width: 992px) 258px, (min-width: 768px) 658px, (min-width: 576px) 478px, calc(100vw - 62px)"
                                        quality="75"
                                    />
                                    <div className="course-price-wrapper">
                                        <div className="course-price ml-3">
                                            <h4>
                                                Cena: <span>1430 zł</span>
                                            </h4>
                                        </div>
                                        <div className="buy-btn">
                                            <Link href={routeMap[routeNames.CONTACT]}>
                                                <a
                                                    className="btn btn-main btn-block"
                                                    onClick={() => trackClick(events.MATURA_EXAM_COURSE_CLICK_ENROLL)}
                                                >
                                                    Zapisz się
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <CourseDetails
                                    items={[
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

                                <CourseRequirements />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
