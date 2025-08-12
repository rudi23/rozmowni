import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../components/PageHeader';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import CourseSidebar from '../../components/CourseSidebar';
import courseGroupImage from '../../../public/images/course-group.jpg';
import Section from '../../components/Section';
import NewSemesterSignUp from '../../components/NewSemesterSignUp';

export default function Courses8Exam() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Egzamin ósmoklasisty" />
            <Section>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="course-single-header">
                            <h2 className="single-course-title">Zajęcia grupowe z języka angielskiego</h2>
                            <p>
                                Czy Twój ósmoklasista/Twoja ósmoklasistka zbliża się do ważnego egzaminu z języka
                                angielskiego? Czy szukasz profesjonalnej pomocy w przygotowaniach do tego kluczowego
                                testu?
                            </p>
                            <p>Nasz kurs przygotowawczy to idealne rozwiązanie!</p>
                            <p>Czego możesz się spodziewać po naszym kursie?</p>
                            <ul className="mb-2">
                                <li>
                                    <strong>Doświadczeni nauczyciele:</strong>Nasz zespół składa się z doświadczonych
                                    nauczycieli języka angielskiego, którzy posiadają bogate doświadczenie w
                                    przygotowywaniu uczniów do egzaminów.
                                </li>
                                <li>
                                    <strong>Indywidualne podejście:</strong> Rozumiemy, że każdy uczeń jest inny i ma
                                    różne potrzeby. Nasz kurs jest dostosowany do poziomu i wymagań każdego uczestnika,
                                    zapewniając indywidualne podejście do nauki.
                                </li>
                                <li>
                                    <strong>Materiały egzaminacyjne:</strong> Oferujemy dostęp do najnowszych materiałów
                                    egzaminacyjnych, testów próbnych i zadań, które pomogą uczniom oswoić się z formatem
                                    egzaminu.
                                </li>
                                <li>
                                    <strong>Ćwiczenia praktyczne:</strong> Nasze zajęcia skupiają się na praktycznym
                                    wykorzystaniu języka angielskiego. Uczniowie będą mieli okazję do rozwijania swoich
                                    umiejętności rozumienia ze słuchu, czytania, mówienia i pisania.
                                </li>
                                <li>
                                    <strong>Wsparcie psychologiczne:</strong> Rozumiemy, że egzamin może być stresujący,
                                    dlatego oferujemy także wsparcie psychologiczne, które pomoże uczniom radzić sobie
                                    ze stresem i poprawić ich pewność siebie.
                                </li>
                                <li>
                                    <strong>Elastyczny harmonogram:</strong> Nasze zajęcia odbywają się w dogodnych
                                    godzinach, aby umożliwić uczniom dostosowanie nauki do swojego planu dnia.
                                </li>
                                <li>
                                    <strong>Śledzenie postępów:</strong> Regularnie oceniamy postępy uczniów i
                                    dostarczamy informacje zwrotne, dzięki czemu każdy uczeń wie, nad czym musi jeszcze
                                    popracować.
                                </li>
                                <li>
                                    <strong>Przyjazna atmosfera:</strong> Nasze zajęcia odbywają się w przyjaznej i
                                    motywującej atmosferze, co sprzyja efektywnej nauce.
                                </li>
                            </ul>
                            <p>
                                Zapisz swojego ósmoklasistę na nasz kurs przygotowawczy do egzaminu z języka
                                angielskiego i daj mu najlepszą szansę na osiągnięcie sukcesu!
                            </p>
                            <p>
                                Skontaktuj się z nami już dziś, aby dowiedzieć się więcej o naszym kursie i dostępnych
                                terminach.
                            </p>
                            <p>Wspólnie pomożemy Twojemu dziecku osiągnąć swoje cele edukacyjne.</p>
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
                        <CourseSidebar
                            image={courseGroupImage}
                            imageAlt="Grupa uczniów podczas lekcji angielskiego"
                            price="1430 zł"
                            enrollEvent={events.EXAM_8_COURSE_CLICK_ENROLL}
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
                                    title: 'Gdzie:',
                                    content: 'Nauka on-line',
                                    icon: 'location-pointer',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Section>
        </>
    );
}
