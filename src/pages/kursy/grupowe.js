import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../components/PageHeader';
import Accordion from '../../components/Accordion';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import CourseRequirements from '../../components/CourseRequirements';
import CourseDetails from '../../components/CourseDetails';
import courseGroupImage from '../../../public/images/course-group.jpg';
import styles from './Course.module.scss';

export default function CoursesGroup() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Kursy grupowe" />

            <section className={styles.root}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="course-single-header">
                                <h2 className="single-course-title">Zajęcia grupowe z języka angielskiego</h2>
                                <p>
                                    Celem kursu jest ćwiczenie swobodnego komunikowania się, poszerzenie słownictwa i
                                    wprowadzenie lub powtórzenie gramatyki
                                </p>
                            </div>

                            <div className="single-course-details ">
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
                            <div className="edutim-single-course-segment edutim-course-topics-wrap">
                                <div className="edutim-course-details justify-content-between">
                                    <h3 className="course-title">Rodzaje zajęć</h3>
                                    <p>Możesz zdecydować się na jeden z czterech rodzajów zajęć:</p>
                                </div>

                                <div className="edutim-course-topics-contents">
                                    <div className="edutim-course-topic">
                                        <Accordion
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
                                                                gramatycznych oraz przede wszystkim pozbycie się
                                                                "bariery językowej".
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
                                                                Ćwiczymy również scenki ‘z życia wzięte’ czyli wszystkie
                                                                prawdopodobne sytuacje, w których można się znaleźć
                                                                wyjeżdżając za granice np. pytanie o drogę, zamawianie
                                                                jedzenia w restauracji, na lotnisku, w hotelu, u lekarza
                                                                itp. Dodatkowo na zajęciach wprowadzane są elementy
                                                                Business English co daje uczniom praktyczną wiedzę z
                                                                tego zakresu.
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
                                                                Dzięki temu kursant osiąga swobodę w porozumiewanie się
                                                                w języku angielskim oraz jest przygotowany do
                                                                kontynuowania nauki na wyższych poziomach w celu
                                                                przygotowania do egzaminów FCE, CAE i CPE.
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
                                                                pisania formalnych dokumentów oraz konwersacje
                                                                biznesowe.
                                                            </p>
                                                        </>
                                                    ),
                                                },
                                            ]}
                                        />
                                    </div>
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
                                                Cena: <span>1650 zł</span>
                                            </h4>
                                        </div>
                                        <div className="buy-btn">
                                            <Link href={routeMap[routeNames.CONTACT]}>
                                                <a
                                                    className="btn btn-main btn-block"
                                                    onClick={() => trackClick(events.GROUP_COURSE_CLICK_ENROLL)}
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
                                            content: '30 w semestrze',
                                            icon: 'refresh-time',
                                        },
                                        {
                                            title: 'Liczba semestrów:',
                                            content: '2 semestry',
                                            icon: 'calendar',
                                        },
                                        {
                                            title: 'Liczba osób:',
                                            content: '2-3 osoby w grupie',
                                            icon: 'group',
                                        },
                                        {
                                            title: 'Płatność:',
                                            content: 'za semestr z góry',
                                            icon: 'money-bag',
                                        },
                                        {
                                            title: 'Poziom:',
                                            content: 'A2, B1, B2, C1, C2',
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
