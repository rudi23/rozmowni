import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import PricingAccordion from '../../components/PricingAccordion';
import styles from './index.module.scss';

export default function Pricing() {
    return (
        <>
            <PageHeader title="Cennik" />
            <Section>
                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="pb-4">Lekcje indywidualne</h2>

                        <PricingAccordion
                            id="pricing"
                            cards={[
                                {
                                    title: 'Lekcje indywidualne:',
                                    price: '95 zł',
                                    priceInfo: 'za 45 min',
                                    id: '1',
                                    items: [
                                        'zajęcia odbywają się 1 lub 2 razy w tygodniu',
                                        'płatność miesięczna, dokonywana z góry podczas zajęć indywidualnych',
                                    ],
                                },
                            ]}
                        />

                        <h2 className="pt-4 pb-4">Kursy w grupach 5-6 osób</h2>

                        <PricingAccordion
                            id="pricing"
                            cards={[
                                {
                                    title: 'Kurs przygotowujący do egzaminu ósmoklasisty:',
                                    price: '810 zł',
                                    priceInfo: 'za semestr',
                                    id: '2',
                                    items: [
                                        'rok nauki podzielony jest na dwa semestry',
                                        'każdy semestr obejmuje 27 godzin lekcyjnych',
                                        'cały kurs roczny obejmuje 54 godziny lekcyjne (od października do połowy marca)',
                                        'zajęcia odbywają się 1 raz w tygodniu po 2 godziny lekcyjne (90 minut)',
                                        'liczba osób w grupie: 5-6',
                                    ],
                                },
                                {
                                    title: 'Kurs przygotowujący do egzaminu maturalnego:',
                                    price: '810 zł',
                                    priceInfo: 'za semestr',
                                    id: '3',
                                    items: [
                                        'rok nauki podzielony jest na dwa semestry',
                                        'każdy semestr obejmuje 27 godzin lekcyjnych',
                                        'cały kurs roczny obejmuje 54 godziny lekcyjne (od października do połowy marca)',
                                        'zajęcia odbywają się 1 raz w tygodniu po 2 godziny lekcyjne (90 minut)',
                                        'liczba osób w grupie: 5-6',
                                    ],
                                },
                                {
                                    title: 'Kurs dla dzieci i młodzieży:',
                                    price: '1020 zł',
                                    priceInfo: 'za semestr',
                                    id: '4',
                                    items: [
                                        'rok nauki podzielony jest na dwa semestry',
                                        'każdy semestr obejmuje 34 godziny lekcyjne',
                                        'cały kurs roczny obejmuje 68 godzin lekcyjnych (od października do połowy czerwca)',
                                        'zajęcia odbywają się 1 raz w tygodniu po 2 godziny lekcyjne (90 minut)',
                                        'liczba osób w grupie: 5-6',
                                        'prowadzimy zajęcia na wszystkich poziomach zaawansowania dopasowując uczniów pod względem poziomu oraz wieku',
                                    ],
                                },
                                {
                                    title: 'Kurs dla dorosłych:',
                                    price: '1020 zł',
                                    priceInfo: 'za semestr',
                                    id: '5',
                                    items: [
                                        'rok nauki podzielony jest na dwa semestry',
                                        'każdy semestr obejmuje 34 godziny lekcyjne',
                                        'cały kurs roczny obejmuje 68 godzin lekcyjnych (od października do połowy czerwca)',
                                        'zajęcia odbywają się 1 raz w tygodniu po 2 godziny lekcyjne (90 minut)',
                                        'liczba osób w grupie: 5-6',
                                        'prowadzimy zajęcia na poziomach: A2, B1, B2, C1, C2',
                                    ],
                                },
                                {
                                    title: 'Kurs konwersacji:',
                                    price: '1020 zł',
                                    priceInfo: 'za semestr',
                                    id: '6',
                                    items: [
                                        'rok nauki podzielony jest na dwa semestry',
                                        'każdy semestr obejmuje 34 godziny lekcyjne',
                                        'cały kurs roczny obejmuje 68 godzin lekcyjnych (od października do połowy czerwca)',
                                        'zajęcia odbywają się 1 raz w tygodniu po 2 godziny lekcyjne (90 minut)',
                                        'liczba osób w grupie: 5-6',
                                        'prowadzimy zajęcia na poziomach zaawansowania A2-C2',
                                    ],
                                },
                            ]}
                        />

                        <h2 className="pt-4 pb-4">Lekcje w mini grupach</h2>

                        <PricingAccordion
                            id="miniGroupPricing"
                            cards={[
                                {
                                    title: 'Lekcje w 2 osoby:',
                                    price: '50 zł',
                                    priceInfo: 'za lekcje od osoby',
                                    id: '1',
                                    items: [
                                        'zajęcia odbywają się 1 lub 2 razy w tygodniu',
                                        'płatność miesięczna, dokonywana z góry',
                                        'liczba osób w grupie: 2',
                                    ],
                                },
                                {
                                    title: 'Lekcje w 3 osoby:',
                                    price: '45 zł',
                                    priceInfo: 'za lekcje od osoby',
                                    id: '2',
                                    items: [
                                        'zajęcia odbywają się 1 lub 2 razy w tygodniu',
                                        'płatność miesięczna, dokonywana z góry',
                                        'liczba osób w grupie: 3',
                                    ],
                                },
                                {
                                    title: 'Lekcje w 4 osoby:',
                                    price: '40 zł',
                                    priceInfo: 'za lekcje od osoby',
                                    id: '3',
                                    items: [
                                        'zajęcia odbywają się 1 lub 2 razy w tygodniu',
                                        'płatność miesięczna, dokonywana z góry',
                                        'liczba osób w grupie: 4',
                                    ],
                                },
                            ]}
                        />

                        <p>Cennik ma charakter informacyjny i nie stanowi oferty w świetle prawa.</p>
                    </div>
                </div>

                <div className="row pt-5">
                    <div className="col-lg-12 col-md-12">
                        <h2 className="pt-4 pb-4">Dane do przelewu bankowego:</h2>

                        <div className={styles.accountInfo}>
                            <p>Rozmowni.pl</p>
                            <p>ul. Witkowicka 68G/1, 31-242 Kraków</p>
                            <p>nr rachunku bankowego: 71 1050 1445 1000 0092 1658 8112</p>
                            <p>
                                w tytule wpłaty prosimy wpisać imię i nazwisko ucznia oraz nazwę wpłaty np. "Jan
                                Kowalski - kurs konwersacji"
                            </p>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
}
