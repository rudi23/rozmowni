/* eslint-disable no-use-before-define */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { getLevel } from '../data/testData';
import * as theme from './theme';

const benefits = [
  [
    'Konwersacje od pierwszej lekcji',
    'specjalizujemy się w praktycznym angielskim z naciskiem na mówienie',
  ],
  [
    'Ciekawe tematy konwersacji',
    'rozmawiamy o rozwoju osobistym, psychologii, relacjach i świecie wokół nas',
  ],
  [
    'Przyjazna atmosfera bez stresu',
    'bez szkolnych ocen i testów, z uśmiechem i wsparciem',
  ],
  [
    'Nauka online',
    'zajęcia zdalne z dowolnego miejsca przez Zoom lub Google Meet',
  ],
  [
    'Kompetencje przyszłości',
    'ćwiczymy kreatywność, komunikację i radzenie sobie z emocjami',
  ],
  ['Szybkie efekty', 'skuteczne metody, które szybko przełożysz na praktykę'],
];

const testimonials = [
  [
    'Gosia prowadzi lekcje w taki sposób, że po prostu chcesz w nich uczestniczyć i się angażować. Na lekcjach poruszamy wszystkie możliwe tematy, czytamy artykuły z gazet o których później dyskutujemy. Gosia skupia się na potrzebach swoich studentów.',
    'Magdalena Groń',
  ],
  [
    'Od pół roku z chęcią uczęszczam na indywidualne zajęcia do Małgorzaty. Zajęcia odbywają się na zasadzie konwersacji i każda lekcja dopasowana jest do moich potrzeb. Z każdą lekcją czuje się bardziej pewny siebie w rozmowach po angielsku.',
    'Łukasz Skotarczak',
  ],
  [
    'Gosia w trakcie zajęć wychodzi poza schematy, wplata w naukę wiele ciekawych informacji i w twórczy sposób motywuje do dalszej pracy. Swobodna konwersacja jest świetnym pretekstem do szlifowania praktycznych umiejętności językowych.',
    'Paulina Badan',
  ],
  [
    'Moim marzeniem było MÓWIĆ po angielsku. Kiedyś miałam z tym duży problem. Na zajęciach duuużo rozmawiałyśmy, dosłownie na każdy temat, co pozwoliło mi przy okazji wzbogacić słownictwo. Polecam z całego serca.',
    'Aleksandra Bańka',
  ],
];

const faq = [
  [
    'Jak długo trwa lekcja próbna?',
    '30 minut, podczas której poznasz naszą metodę i otrzymasz feedback.',
  ],
  [
    'Czy mogę zmienić grupę jeśli mi nie pasuje?',
    'Tak, zawsze możesz zmienić grupę lub przejść na lekcje indywidualne.',
  ],
  [
    'Jak często odbywają się lekcje?',
    'Zazwyczaj 1 raz w tygodniu po 45 lub 90 minut, ale harmonogram jest elastyczny.',
  ],
];

const TestResultsEmail = ({
  fullName,
  testScore,
  testLevel,
  testType,
  totalQuestions,
}) => {
  const score = parseInt(testScore.split('/')[0]);
  const percentage = Math.round((score / totalQuestions) * 100);
  const level = getLevel(score, testType);

  return (
    <Html>
      <Head />
      <Preview>Wynik testu poziomującego i e-book Czas na angielski</Preview>
      <Body style={theme.main}>
        <Container style={theme.container}>
          <Section style={theme.header}>
            <Img
              src="https://rozmowni.pl/images/logo-rozmowni.png"
              width="250"
              height="75"
              alt="Rozmowni.pl"
              style={theme.logo}
            />
          </Section>

          <Hr style={theme.hr} />

          <Section style={theme.content}>
            <Heading style={theme.h1}>Cześć {fullName}!</Heading>

            <Text style={theme.text}>
              Dziękujemy za wypełnienie testu poziomującego. Oto Twój wynik:
            </Text>

            {/* Result */}
            <Section style={resultsCard}>
              <Text style={scoreText}>
                {score}/{totalQuestions} ({percentage}%)
              </Text>
              <Text style={levelText}>{testLevel}</Text>
              <Text style={testTypeText}>
                {testType === 'adults'
                  ? 'Test dla dorosłych'
                  : 'Test dla młodzieży (11-16 lat)'}
              </Text>
            </Section>

            <Section style={theme.cardTinted}>
              <Heading style={theme.h2}>Co oznacza Twój poziom?</Heading>
              <Text style={{ ...theme.text, margin: '0' }}>
                {level?.description}
              </Text>
            </Section>

            {/* Next steps */}
            <Heading style={theme.h3}>Co dalej?</Heading>
            <Text style={theme.text}>
              Wkrótce skontaktujemy się z Tobą w celu umówienia bezpłatnej
              lekcji próbnej, dzięki której:
            </Text>
            <ul style={list}>
              <li style={theme.listItem}>
                Otrzymasz od lektora feedback o swoich mocnych stronach i
                obszarach do poprawy
              </li>
              <li style={theme.listItem}>
                Poznasz nasz unikatowy sposób nauczania skupiony na
                konwersacjach
              </li>
              <li style={theme.listItem}>
                Ustalisz konkretny plan nauki dostosowany do Twoich celów
              </li>
              <li style={theme.listItem}>
                Otrzymasz propozycję kursu idealnie dopasowaną do Twoich potrzeb
              </li>
            </ul>

            {/* E-book */}
            <Section style={ebookSection}>
              <Heading style={{ ...theme.h2, margin: '0 0 12px' }}>
                Darmowy e-book dla Ciebie
              </Heading>
              <Text style={theme.text}>
                Przygotowaliśmy dla Ciebie e-book „Czas na angielski” —
                kompletny przewodnik po czasach gramatycznych (12 stron).
              </Text>
              <Button
                style={theme.button}
                href="https://rozmowni.pl/shared/czasy_ebook_(rozmowni.pl).pdf"
              >
                Pobierz e-book za darmo
              </Button>
            </Section>

            {/* Why us */}
            <Heading style={theme.h3}>Dlaczego warto uczyć się z nami?</Heading>
            <ul style={list}>
              {benefits.map(([title, detail]) => (
                <li style={theme.listItem} key={title}>
                  <strong style={strong}>{title}</strong> — {detail}
                </li>
              ))}
            </ul>

            {/* Social proof */}
            <Section style={theme.cardSubtle}>
              <Text style={{ ...theme.text, margin: '0 0 8px' }}>
                <strong style={strong}>
                  Dołącz do ponad 100 zadowolonych uczniów
                </strong>
              </Text>
              <Text style={{ ...theme.textMuted, margin: '0' }}>
                Średnia ocena 4,9/5. 95% uczniów poleca nas swoim znajomym, a
                87% osiąga swój cel językowy w ciągu 6 miesięcy.
              </Text>
            </Section>

            <Heading style={theme.h3}>Co mówią nasi uczniowie</Heading>
            {testimonials.map(([quote, author]) => (
              <Section style={testimonial} key={author}>
                <Text style={quoteText}>„{quote}”</Text>
                <Text style={quoteAuthor}>{author}</Text>
              </Section>
            ))}

            {/* FAQ */}
            <Heading style={theme.h3}>Często zadawane pytania</Heading>
            {faq.map(([question, answer]) => (
              <Section style={faqItem} key={question}>
                <Text style={{ ...theme.text, margin: '0 0 6px' }}>
                  <strong style={strong}>{question}</strong>
                </Text>
                <Text style={{ ...theme.textMuted, margin: '0' }}>
                  {answer}
                </Text>
              </Section>
            ))}

            {/* Contact */}
            <Section style={theme.cardSubtle}>
              <Heading style={theme.h2}>Nie chcesz czekać?</Heading>
              <Text style={theme.text}>
                <Link
                  href="https://calendar.app.google/KLQj9fsmxGDxF6Jz5"
                  style={theme.link}
                >
                  Zarezerwuj termin lekcji próbnej
                </Link>
              </Text>
              <Text style={theme.text}>
                Napisz na{' '}
                <Link
                  href="mailto:kontakt@rozmowni.pl?subject=Odpowiedź na wynik testu poziomującego"
                  style={theme.link}
                >
                  kontakt@rozmowni.pl
                </Link>{' '}
                albo zadzwoń:{' '}
                <Link href="tel:+48506262227" style={theme.link}>
                  +48 506 262 227
                </Link>
              </Text>
              <Text style={{ ...theme.text, margin: '0' }}>
                Więcej o szkole na{' '}
                <Link href="https://rozmowni.pl" style={theme.link}>
                  rozmowni.pl
                </Link>
              </Text>
            </Section>
          </Section>

          <Hr style={theme.hr} />

          <Section style={theme.footer}>
            <Text style={theme.footerText}>
              © 2026 Rozmowni.pl — Szkoła języka angielskiego
            </Text>
            <Text style={theme.footerFine}>
              Otrzymujesz tę wiadomość, ponieważ wypełniono test poziomujący na
              rozmowni.pl.{' '}
              <Link
                href="mailto:kontakt@rozmowni.pl?subject=Wypisz%20mnie"
                style={theme.footerLink}
              >
                Wypisz się
              </Link>
              , a nie będziemy się więcej kontaktować.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const resultsCard = {
  ...theme.card,
  backgroundColor: theme.colors.surfaceAlt,
  textAlign: 'center',
  padding: '28px 24px',
};

const scoreText = {
  color: theme.colors.teal,
  fontFamily: theme.headingStack,
  fontSize: '36px',
  fontWeight: 'bold',
  lineHeight: '1.1',
  margin: '0 0 8px',
};

const levelText = {
  color: theme.colors.navy,
  fontFamily: theme.headingStack,
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
};

const testTypeText = {
  color: theme.colors.textMuted,
  fontSize: '14px',
  margin: '8px 0 0',
};

const ebookSection = {
  ...theme.card,
  backgroundColor: theme.colors.cream,
  borderColor: theme.colors.cream,
  textAlign: 'center',
};

const list = {
  margin: '0 0 20px',
  padding: '0 0 0 20px',
};

const strong = {
  color: theme.colors.navy,
};

const testimonial = {
  ...theme.card,
  margin: '0 0 12px',
  padding: '18px 20px',
};

const quoteText = {
  ...theme.text,
  fontStyle: 'italic',
  margin: '0 0 8px',
};

const quoteAuthor = {
  ...theme.textMuted,
  fontFamily: theme.headingStack,
  fontWeight: 'bold',
  margin: '0',
};

const faqItem = {
  ...theme.card,
  backgroundColor: theme.colors.surfaceAlt,
  margin: '0 0 12px',
  padding: '18px 20px',
};

export default TestResultsEmail;
