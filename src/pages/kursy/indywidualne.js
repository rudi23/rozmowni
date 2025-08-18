import PageHeader from '../../components/PageHeader';
import Accordion from '../../components/Accordion';
import { events } from '../../services/tracking';
import CourseSidebar from '../../components/CourseSidebar';
import CourseHeader from '../../components/CourseHeader';
import CourseInfo from '../../components/CourseInfo';
import CourseLayout from '../../components/CourseLayout';
import courseIndividualImage from '../../../public/images/course-individual.jpg';
import NewSemesterSignUp from '../../components/NewSemesterSignUp';

export default function CoursesIndividual() {
    return (
        <>
            <PageHeader title="Kursy indywidualne" />

            <NewSemesterSignUp />

            <CourseLayout
                background="gray"
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
                                icon: 'alarm-clock',
                            },
                            {
                                title: 'Koszt:',
                                content: '120 zł',
                                icon: 'money',
                            },
                            {
                                title: 'Płatność:',
                                content: 'za miesiąc z góry',
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
                }
            >
                <CourseHeader title="Zajęcia indywidualne z języka angielskiego">
                    <p>
                        Lekcje indywidualne można porównać do usługi szycia dokładnie na Twoją miarę. Podczas zajęć
                        indywidualnych cała uwaga nauczyciela jest skupiona tylko na Tobie i Twoich potrzebach. Materiał
                        dostosowany jest do Ciebie, Twojego tempa, interesujących Cię tematów i materiałów, które trafią
                        do Ciebie najlepiej. Możemy skupić się na konwersacjach, powtórce gramatyki lub ćwiczyć
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

                <h3 className="course-title">Rodzaje zajęć</h3>
                <p>Możesz zdecydować się na jeden z czterech rodzajów zajęć:</p>

                <Accordion
                    id="individualTypes"
                    cards={[
                        {
                            title: 'Konwersacje',
                            id: '1',
                            content: (
                                <>
                                    <p>
                                        Konwersacje są to zajęcia w całości poświęcone na ćwiczenie umiejętności
                                        mówienia w języku obcym. Mają na celu utrwalenie poznanego słownictwa i struktur
                                        gramatycznych oraz przede wszystkim pozbycie się "bariery językowej".
                                    </p>
                                    <p>
                                        Konwersacje są prowadzone nie tylko przez polskich lektorów, lecz także przez
                                        rodowitych Anglików lub Amerykanów (Native Speakers).
                                    </p>
                                    <p>Uczestnicy kursu nabywają pewności siebie i swobodnie używają języka obcego.</p>
                                    <p>
                                        Ćwiczymy również scenki 'z życia wzięte' czyli wszystkie prawdopodobne sytuacje,
                                        w których można się znaleźć wyjeżdżając za granice np. pytanie o drogę,
                                        zamawianie jedzenia w restauracji, na lotnisku, w hotelu, u lekarza itp.
                                        Dodatkowo na zajęciach wprowadzane są elementy Business English co daje uczniom
                                        praktyczną wiedzę z tego zakresu.
                                    </p>
                                    <p>
                                        Uczestnicy kursu również sami wybierają interesujące ich tematy dyskusji. Dzięki
                                        temu uczniowie, którzy mają możliwość współtworzyć lekcje, z zaangażowaniem
                                        uczestniczą w zajęciach. Zdobywają oni cenną umiejętność negocjowania,
                                        relacjonowania wydarzeń a nawet targowania się w obcym języku.
                                    </p>
                                    <p>
                                        Stopień trudności i tematy na kursie konwersacji są dopasowane do wieku i
                                        stopnia zaawansowania językowego uczniów.
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
                                        Celem kursu jest rozwój wszystkich sprawności językowych (mówienia, czytania,
                                        słuchania oraz pisania).
                                    </p>
                                    <p>
                                        Dzięki temu kursant osiąga swobodę w porozumiewanie się w języku angielskim oraz
                                        jest przygotowany do kontynuowania nauki na wyższych poziomach w celu
                                        przygotowania do egzaminów FCE, CAE i CPE.
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
                                        Rezultatem kursu jest przygotowanie do egzaminu ósmoklasisty lub egzaminu
                                        maturalnego
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
                                        Kurs ten skierowany jest do osób posługujących się językiem angielskim w pracy.
                                    </p>
                                    <p>
                                        Program zajęć obejmuje naukę słownictwa tematycznego, pisania formalnych
                                        dokumentów oraz konwersacje biznesowe.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                />
            </CourseLayout>
        </>
    );
}
