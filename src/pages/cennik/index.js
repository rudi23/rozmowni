import Section from '../../components/Section';
import PageHeader from '../../components/PageHeader';
import PricingCards from '../../components/PricingCards';
import BankDetails from '../../components/BankDetails';
import { routeMap, routeNames } from '../../routes';
import styles from './index.module.scss';

const perLesson = [
  {
    name: 'Lekcje indywidualne',
    price: '120 zł',
    unit: 'za 45 minut',
    items: [
      'Zajęcia 1 lub 2 razy w tygodniu',
      'Płatność miesięczna, z góry podczas zajęć',
    ],
  },
  {
    name: 'Lekcje w 2 osoby',
    price: '65 zł',
    unit: 'za lekcję od osoby',
    items: [
      'Zajęcia 1 lub 2 razy w tygodniu',
      'Płatność miesięczna, z góry',
      'Grupa 2 osób',
    ],
  },
];

const holiday = [
  {
    name: 'Kurs wakacyjny w grupie 4-5 osób',
    price: '840 zł',
    unit: 'za miesiąc',
    items: [
      'Kurs trwa cały lipiec',
      '24 godziny lekcyjne',
      'Zajęcia 3 razy w tygodniu po 90 minut',
      'Grupa 4-5 osób',
    ],
  },
];

const groups = [
  {
    name: 'Kurs przygotowujący do egzaminu ósmoklasisty',
    price: '1430 zł',
    unit: 'za semestr',
    items: [
      '26 godzin lekcyjnych w semestrze',
      '52 godziny w całym roku (październik – połowa marca)',
      'Zajęcia raz w tygodniu po 90 minut',
      'Grupa 3-4 osób',
    ],
  },
  {
    name: 'Kurs przygotowujący do egzaminu maturalnego',
    price: '1430 zł',
    unit: 'za semestr',
    items: [
      '26 godzin lekcyjnych w semestrze',
      '52 godziny w całym roku (październik – połowa marca)',
      'Zajęcia raz w tygodniu po 90 minut',
      'Grupa 3-4 osób',
    ],
  },
  {
    name: 'Kurs dla dzieci i młodzieży',
    price: '1650 zł',
    unit: 'za semestr',
    items: [
      '30 godzin lekcyjnych w semestrze',
      '60 godzin w całym roku (październik – połowa czerwca)',
      'Zajęcia raz w tygodniu po 90 minut',
      'Grupa 3-4 osób',
      'Wszystkie poziomy zaawansowania, grupy dobierane wiekiem i poziomem',
    ],
  },
  {
    name: 'Kurs dla dorosłych',
    price: '1650 zł',
    unit: 'za semestr',
    items: [
      '30 godzin lekcyjnych w semestrze',
      '60 godzin w całym roku (październik – połowa czerwca)',
      'Zajęcia raz w tygodniu po 90 minut',
      'Grupa 3-4 osób',
      'Poziomy A2, B1, B2, C1, C2',
    ],
  },
  {
    name: 'Kurs konwersacji',
    price: '1650 zł',
    unit: 'za semestr',
    items: [
      '30 godzin lekcyjnych w semestrze',
      '60 godzin w całym roku (październik – połowa czerwca)',
      'Zajęcia raz w tygodniu po 90 minut',
      'Grupa 3-4 osób',
      'Poziomy A2 – C2',
    ],
  },
];

export default function Pricing() {
  return (
    <>
      <PageHeader
        title="Cennik"
        lede="Ceny lekcji indywidualnych, zajęć w mini grupach i kursów semestralnych."
      />
      <Section>
        <h2 className={styles.groupHeading}>
          Lekcje indywidualne i w mini grupach
        </h2>
        <PricingCards cards={perLesson} />

        {routeMap[routeNames.HOLIDAY_COURSE] && (
          <>
            <h2 className={styles.groupHeading}>Intensywne kursy wakacyjne</h2>
            <PricingCards cards={holiday} />
          </>
        )}

        <h2 className={styles.groupHeading}>Kursy w grupach 3-4 osoby</h2>
        <PricingCards cards={groups} />

        <p className={styles.disclaimer}>
          Cennik ma charakter informacyjny i nie stanowi oferty w świetle prawa.
        </p>
      </Section>

      <Section background="gray">
        <BankDetails />
      </Section>
    </>
  );
}
