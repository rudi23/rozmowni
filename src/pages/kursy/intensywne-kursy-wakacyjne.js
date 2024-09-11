import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../components/PageHeader';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import holidayCourseImage from '../../../public/images/course-holiday-2023.jpg';
import { decryptEmail } from '../../utils';
import styles from './Course.module.scss';

export const getServerSideProps = async () => {
    if (!routeMap[routeNames.HOLIDAY_COURSE]) {
        return {
            notFound: true, //redirects to 404 page
        };
    }
};

export default function HolidayCourse() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Intensywne kursy wakacyjne" />

            <section className={styles.root}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"></div>
                        <div className="col-lg-8">
                            <div className="course-single-header">
                                <div className="img-block">
                                    <Link href={routeMap[routeNames.CONTACT]}>
                                        <a onClick={() => trackClick(events.HOLIDAY_COURSE_CLICK_BANNER)}>
                                            <Image
                                                src={holidayCourseImage}
                                                alt="Kursy wakacyjne"
                                                placeholder="blur"
                                                layout="responsive"
                                                sizes="(min-width: 1200px) 560px, (min-width: 992px) 640px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                                                quality="75"
                                            />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="course-single-header">
                                <h2 className="pt-3 pb-3">ROZGADAJ SIĘ W WAKACJE</h2>

                                <p>
                                    Dziękujemy za zainteresowanie ofertą wakacyjnych kursów języka angielskiego dla
                                    dorosłych w Rozmowni.pl!
                                </p>
                                <p>
                                    Nasze zajęcia skupiają się głównie na konwersacjach, aby pomóc Ci w rozwijaniu
                                    umiejętności komunikacyjnych w języku angielskim.{' '}
                                </p>

                                <p>Oto szczegóły naszej oferty:</p>
                                <h3 className="pt-2 pb-4">
                                    Wakacyjny kurs konwersacji w języku angielskim dla dorosłych
                                </h3>
                                <p>
                                    Częstotliwość zajęć: <strong>3 razy w tygodniu</strong>
                                </p>
                                <p>
                                    Czas trwania: Każde spotkanie trwa <strong>2 godziny lekcyjne (90 min)</strong>
                                </p>
                                <p>
                                    Tryb zajęć: <strong>Online</strong> (przez platformę internetową Google Meets lub
                                    Zoom)
                                </p>

                                <h4 className="pt-2 pb-2">Program kursu:</h4>
                                <p>
                                    Nasze zajęcia opierają się na praktycznych ćwiczeniach konwersacyjnych, które pomogą
                                    Ci zdobyć pewność siebie i płynność w używaniu języka angielskiego. Podczas kursu
                                    będziesz uczestniczyć w różnorodnych interaktywnych zajęciach, takich jak:
                                </p>
                                <ul className="pt-2 pb-2">
                                    <li>
                                        <h5 className="pb-2">Konwersacje tematyczne:</h5>
                                        <p>
                                            Uczestniczysz w rozmowach na różne tematy, takie jak podróże, kultura, życie
                                            codzienne, praca, hobby i wiele innych. Będziesz mieć okazję ćwiczyć
                                            słuchanie, mówienie i rozumienie, korzystając z różnorodnego materiału do
                                            dyskusji.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className="pt-2 pb-2">Role-play:</h5>
                                        <p>
                                            Wykorzystamy technikę role-play, aby naśladować realistyczne sytuacje
                                            komunikacyjne. Będziesz mógł/mogła ćwiczyć swoje umiejętności językowe w
                                            kontekście codziennych sytuacji, takich jak rezerwacja hotelu, zamawianie
                                            jedzenia w restauracji czy prowadzenie rozmów biznesowych.
                                        </p>
                                    </li>
                                    <li>
                                        <h5 className="pt-2 pb-2">Dyskusje grupowe:</h5>
                                        <p>
                                            Weźmiesz udział w grupowych dyskusjach, które pomogą Ci rozwijać
                                            umiejętności słuchania i mówienia w większym gronie. Poruszać będziemy
                                            aktualne tematy społeczne, kulturalne i biznesowe, aby zapewnić Ci praktykę
                                            w różnych kontekstach.
                                        </p>
                                    </li>
                                </ul>

                                <h4 className="pt-2">Korzyści:</h4>
                                <ul className="pt-2 pb-2">
                                    <li>Zwiększenie płynności w mówieniu i rozumieniu języka angielskiego.</li>
                                    <li>Poprawa umiejętności komunikacyjnych w różnorodnych sytuacjach.</li>
                                    <li>Rozwinięcie pewności siebie w używaniu języka angielskiego.</li>
                                    <li>
                                        Zdobycie nowych słów i zwrotów, które mogą być przydatne w życiu codziennym i w
                                        pracy.
                                    </li>
                                </ul>

                                <h4 className="pt-4 pb-3">Cena i zapisy:</h4>

                                <h5 className="pt-2 pb-2">ZAJĘCIA GRUPOWE</h5>
                                <p>
                                    Cena: <strong>799 zł za miesiąc</strong>
                                </p>
                                <p>
                                    Cena obejmuje <strong>10 spotkań</strong> po{' '}
                                    <strong>2 lekcje 45-cio minutowe</strong> w grupie <strong>4-6 osobowej</strong>.
                                    Łącznie 20 lekcji x 45 min
                                </p>
                                <p>
                                    Zajęcia <strong>zaczynają się 10 lipca, a kończą 31 lipca.</strong> Dla osób
                                    chętnych przewidziana jest możliwość kontynuacji kursu w sierpniu.
                                </p>
                                <p>
                                    <strong>Zapisy: do 10 lipca</strong>
                                </p>

                                <h5 className="pt-3 pb-2">ZAJĘCIA INDYWIDUALNE</h5>
                                <p>
                                    zajęcia indywidualne odbywają się <strong>1 lub 2 razy w tygodniu</strong>
                                </p>
                                <p>
                                    Cena: <strong>110 zł za lekcję 45 min</strong>
                                </p>

                                <h4 className="pt-4 pb-2">Jak zapisać się na zajęcia?</h4>
                                <p>
                                    Napisz do nas wiadomość korzystając z{' '}
                                    <a onClick={() => trackClick(events.HOLIDAY_COURSE_CLICK_CONTACT)}>
                                        formularza kontaktowego
                                    </a>
                                    , maila na{' '}
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            decryptEmail(
                                                'a29udGFrdEByb3ptb3duaS5wbA==',
                                                'Kurs wakacyjny języka angielskiego w Rozmowni.pl'
                                            );
                                            trackClick(events.HOLIDAY_COURSE_CLICK_EMAIL);
                                            e.preventDefault();
                                        }}
                                    >
                                        kontakt@rozmowni.pl
                                    </a>{' '}
                                    lub zadzwoń na{' '}
                                    <a
                                        href="tel:+48506262227"
                                        onClick={() => trackClick(events.HOLIDAY_COURSE_CLICK_PHONE)}
                                    >
                                        506 262 227
                                    </a>{' '}
                                    i umów się na bezpłatny TEST KWALIFIKACYJNY. Podczas testu poznasz swój poziom
                                    zaawansowania i dowiesz się więcej na temat zajęć.
                                </p>

                                <Link href={routeMap[routeNames.CONTACT]}>
                                    <a
                                        className="btn btn-main mt-4"
                                        onClick={() => trackClick(events.HOLIDAY_COURSE_CLICK_CONTACT)}
                                    >
                                        <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                        Zapisz się już dziś
                                    </a>
                                </Link>

                                <h4 className="pt-4 pb-2">Do zobaczenia!</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
