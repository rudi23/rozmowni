import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import Section from './Section';
import SectionHeading from './SectionHeading';
import Accordion from './Accordion';
import styles from './TestFAQ.module.scss';

export default function TestFAQ() {
    const trackClick = useClickTracking();

    const faqs = [
        {
            q: 'Ile czasu zajmuje test?',
            a: 'Test trwa około 10 minut. Jest szybki, ale bardzo precyzyjny w ocenie Twojego poziomu. Składa się z 22-25 pytań dostosowanych do Twojego wieku.',
        },
        {
            q: 'Czy test jest naprawdę darmowy?',
            a: 'TAK! Test jest w 100% bezpłatny. Nie pobieramy żadnych opłat ani nie wymagamy podania danych karty. Wystarczy tylko imię, nazwisko, numer telefonu oraz email do wysłania wyników.',
        },
        {
            q: 'Kiedy otrzymam wynik testu?',
            a: 'Wynik testu otrzymasz NATYCHMIAST po zakończeniu testu na ekranie. W ciągu 24h wyślemy też zaproszenie na bezpłatną próbną lekcję i darmowy e-book "Czas na angielski".',
        },
        {
            q: 'Czy będę otrzymywać spam po teście?',
            a: 'NIE! Wyślemy Ci tylko: wynik testu, zaproszenie na bezpłatną lekcję próbną oraz darmowy e-book "Czas na angielski". To wszystko. Możesz się wypisać w każdej chwili.',
        },
        {
            q: 'Do jakich poziomów jest test?',
            a: 'Test ocenia poziomy od A1 do C2 według standardów europejskich CEFR. Mamy osobne wersje dla młodzieży (11-16 lat) i dorosłych (17+ lat) z dostosowanymi pytaniami.',
        },
        {
            q: 'Czy muszę się zobowiązywać do kursu?',
            a: 'NIE! Test i konsultacja są bez zobowiązań. Decyzję o kursie podejmujesz dopiero po otrzymaniu wszystkich informacji i rozmowie z naszym ekspertem.',
        },
        {
            q: 'Czy mogę powtórzyć test?',
            a: 'Tak, ale zalecamy odczekanie przynajmniej miesiąca. Twój poziom potrzebuje czasu na rozwój. Za pierwszym razem test jest najbardziej obiektywny.',
        },
        {
            q: 'Co jeśli mój poziom jest bardzo niski?',
            a: 'Nie ma złych wyników! Każdy poziom to dobry punkt startowy. Przygotujemy dla Ciebie plan rozwoju dokładnie od miejsca, w którym jesteś teraz.',
        },
    ];

    return (
        <Section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center">
                        <SectionHeading
                            heading="Najczęściej zadawane pytania"
                            subheading="Rozwiążmy Twoje wątpliwości"
                        />
                        <p className={styles.intro}>
                            Odpowiadamy na wszystkie pytania, które mogą Cię nurtować przed zrobieniem testu
                        </p>
                    </div>

                    <div className={styles.faqContainer}>
                        <Accordion
                            id="testFAQ"
                            cards={faqs.map((faq, index) => ({
                                title: (
                                    <span className={styles.questionTitle}>
                                        <FontAwesomeIcon icon={faQuestion} className={styles.questionIcon} />
                                        {faq.q}
                                    </span>
                                ),
                                id: index.toString(),
                                content: (
                                    <div className={styles.answer}>
                                        <FontAwesomeIcon icon={faLightbulb} className={styles.answerIcon} />
                                        <p>{faq.a}</p>
                                    </div>
                                ),
                            }))}
                        />
                    </div>

                    <div className={styles.faqCta}>
                        <div className={styles.ctaBox}>
                            <h4>Masz inne pytanie?</h4>
                            <p>
                                Zrób test, a podczas <strong>darmowej konsultacji</strong> odpowiemy na wszystkie Twoje
                                pytania!
                            </p>

                            <div className={styles.ctaButtons}>
                                <Link
                                    href={routeMap[routeNames.TEST]}
                                    className={`btn btn-main ${styles.primaryButton}`}
                                    onClick={() => trackClick(events.HOME_FAQ_CLICK_TEST)}
                                >
                                    ZRÓB TEST I ZAPYTAJ EKSPERTA
                                </Link>

                                <Link
                                    href={routeMap[routeNames.CONTACT]}
                                    className={`btn btn-outline ${styles.secondaryButton}`}
                                    onClick={() => trackClick(events.HOME_FAQ_CLICK_CONTACT)}
                                >
                                    Zadaj pytanie teraz
                                </Link>
                            </div>

                            <div className={styles.guarantee}>
                                <small>✓ Odpowiedź w ciągu 24h ✓ Bez zobowiązań ✓ Profesjonalne doradztwo</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
