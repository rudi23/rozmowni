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
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://rozmowni.pl/images/logo-rozmowni.png"
              width="250"
              height="75"
              alt="Rozmowni.pl"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Cześć {fullName}! 👋</Heading>

            <Text style={text}>
              Dziękujemy za wypełnienie testu poziomującego! Oto Twój wynik:
            </Text>

            {/* Test Results Card */}
            <Section style={resultsCard}>
              <Heading style={h2}>Twój wynik testu</Heading>

              <Section style={scoreSection}>
                <Text style={scoreText}>
                  {score}/{totalQuestions} ({percentage}%)
                </Text>
                <Text style={levelText}>{testLevel}</Text>
              </Section>

              <Text style={testTypeText}>
                {testType === 'adults'
                  ? 'Test dla dorosłych'
                  : 'Test dla młodzieży (11-16 lat)'}
              </Text>
            </Section>

            {/* Level Description */}
            <Section style={levelDescription}>
              <Heading style={h3}>Co oznacza Twój poziom?</Heading>
              <Text style={text}>{level?.description}</Text>
            </Section>

            {/* Social Proof Section */}
            <Section style={socialProofSection}>
              <Text style={socialProofText}>
                <strong>Dołącz do ponad 100 zadowolonych uczniów!</strong>
                <br />
                Średnia ocena: ⭐⭐⭐⭐⭐ (4.9/5)
              </Text>
              <Text style={socialProofStats}>
                📈 <strong>95% uczniów</strong> poleca nas swoim znajomym
                <br />
                🎯 <strong>87% uczniów</strong> osiąga swój cel językowy w ciągu
                6 miesięcy
                <br />
                💬 <strong>100% lekcji</strong> prowadzonych w języku angielskim
              </Text>
            </Section>

            {/* Testimonials Section */}
            <Section style={testimonialsSection}>
              <Heading style={h3}>Co mówią nasi uczniowie</Heading>
              <Text style={testimonial}>
                "Gosia prowadzi lekcje w taki sposób, że po prostu chcesz w nich
                uczestniczyć i się angażować. Na lekcjach poruszamy wszystkie
                możliwe tematy, czytamy artykuły z gazet o których później
                dyskutujemy. Gosia skupia się na potrzebach swoich studentów." -{' '}
                <em>Magdalena Groń</em>
              </Text>
              <Text style={testimonial}>
                "Od pół roku z chęcią uczęszczam na indywidualne zajęcia do
                Małgorzaty. Zajęcia odbywają się na zasadzie konwersacji i każda
                lekcja dopasowana jest do moich potrzeb. Z każdą lekcją czuje
                się bardziej pewny siebie w rozmowach po angielsku." -{' '}
                <em>Łukasz Skotarczak</em>
              </Text>
              <Text style={testimonial}>
                "Gosia w trakcie zajęć wychodzi poza schematy, wplata w naukę
                wiele ciekawych informacji i w twórczy sposób motywuje do
                dalszej pracy. Swobodna konwersacja jest świetnym pretekstem do
                szlifowania praktycznych umiejętności językowych." -{' '}
                <em>Paulina Badan</em>
              </Text>
              <Text style={testimonial}>
                "Moim marzeniem było MÓWIĆ po angielsku. Kiedyś miałam z tym
                duży problem. Na zajęciach duuużo rozmawiałyśmy, dosłownie na
                każdy temat, co pozwoliło mi przy okazji wzbogacić słownictwo.
                Polecam z całego serca." - <em>Aleksandra Bańka</em>
              </Text>
            </Section>

            {/* Benefits Section */}
            <Section style={benefitsSection}>
              <Heading style={h3}>Dlaczego warto uczyć się z nami?</Heading>
              <div style={benefitsList}>
                <Text style={benefitItem}>
                  ✅ <strong>Konwersacje od pierwszej lekcji</strong> -
                  specjalizujemy się w praktycznym angielskim z naciskiem na
                  mówienie
                </Text>
                <Text style={benefitItem}>
                  ✅ <strong>Ciekawe tematy konwersacji</strong> - rozmawiamy o
                  rozwoju osobistym, psychologii, relacjach i świecie wokół nas
                </Text>
                <Text style={benefitItem}>
                  ✅ <strong>Przyjazna atmosfera bez stresu</strong> - bez
                  szkolnych ocen i testów, z uśmiechem i wsparciem
                </Text>
                <Text style={benefitItem}>
                  ✅ <strong>Nauka online</strong> - zajęcia zdalne z dowolnego
                  miejsca przez Zoom lub Google Meet
                </Text>
                <Text style={benefitItem}>
                  ✅ <strong>Kompetencje przyszłości</strong> - ćwiczymy
                  kreatywność, komunikację i radzenie sobie z emocjami
                </Text>
                <Text style={benefitItem}>
                  ✅ <strong>Szybkie efekty</strong> - skuteczne metody, które
                  szybko przełożysz na praktykę
                </Text>
              </div>
            </Section>

            {/* Free E-book Section */}
            <Section style={ebookSection}>
              <Heading style={h3}>🎁 Darmowy e-book dla Ciebie!</Heading>
              <Text style={text}>
                Przygotowaliśmy dla Ciebie darmowy e-book "Czas na angielski" -
                kompletny przewodnik po czasach gramatycznych (12 stron).
              </Text>

              <Button
                style={button}
                href="https://rozmowni.pl/shared/czasy_ebook_(rozmowni.pl).pdf"
              >
                📥 Pobierz e-book za darmo
              </Button>
            </Section>

            {/* FAQ Section */}
            <Section style={faqSection}>
              <Heading style={h3}>Często zadawane pytania</Heading>
              <Text style={faqItem}>
                <strong>Q: Jak długo trwa lekcja próbna?</strong>
                <br />
                A: 30 minut, podczas której poznasz naszą metodę i otrzymasz
                feedback.
              </Text>
              <Text style={faqItem}>
                <strong>Q: Czy mogę zmienić grupę jeśli mi nie pasuje?</strong>
                <br />
                A: Tak, zawsze możesz zmienić grupę lub przejść na lekcje
                indywidualne.
              </Text>
              <Text style={faqItem}>
                <strong>Q: Jak często odbywają się lekcje?</strong>
                <br />
                A: Zazwyczaj 1 raz w tygodniu po 45 lub 90 minut, ale
                harmonogram jest elastyczny.
              </Text>
            </Section>

            {/* Next Steps */}
            <Section style={nextSteps}>
              <Heading style={h3}>Co dalej?</Heading>
              <Text style={text}>
                Wkrótce skontaktujemy się z Tobą w celu umówienia bezpłatnej
                lekcji próbnej, dzięki której:
              </Text>

              <ul style={list}>
                <li style={listItem}>
                  Otrzymasz od lektora feedback o swoich mocnych stronach i
                  obszarach do poprawy
                </li>
                <li style={listItem}>
                  Poznasz nasz unikatowy sposób nauczania skupiony na
                  konwersacjach
                </li>
                <li style={listItem}>
                  Ustalisz konkretny plan nauki dostosowany do Twoich celów
                </li>
                <li style={listItem}>
                  Otrzymasz propozycję kursu idealnie dopasowaną do Twoich
                  potrzeb
                </li>
              </ul>
            </Section>

            {/* Contact Info */}
            <Section style={contactSection}>
              <Text style={text}>
                <strong>Nie chcesz czekać?</strong> Możesz:
              </Text>
              <Text style={text}>
                📅{' '}
                <Link
                  href="https://calendar.app.google/KLQj9fsmxGDxF6Jz5"
                  style={link}
                >
                  Zarezerwować termin lekcji próbnej
                </Link>
              </Text>
              <Text style={text}>
                📧{' '}
                <Link
                  href="mailto:kontakt@rozmowni.pl?subject=Odpowiedź na wynik testu poziomującego"
                  style={link}
                >
                  Odpowiedzieć na ten email
                </Link>
              </Text>
              <Text style={text}>
                📞 Zadzwonić:{' '}
                <Link href="tel:+48506262227" style={link}>
                  +48 506 262 227
                </Link>
              </Text>
              <Text style={text}>
                🌐 Odwiedzić naszą stronę:{' '}
                <Link href="https://rozmowni.pl" style={link}>
                  rozmowni.pl
                </Link>
              </Text>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2026 Rozmowni.pl - Szkoła języka angielskiego
            </Text>
            <Text style={footerText}>Wszystkie prawa zastrzeżone</Text>
            <Text style={unsubscribeText}>
              Otrzymujesz tę wiadomość, ponieważ wypełniono test poziomujący na
              rozmowni.pl.{' '}
              <Link
                href="mailto:kontakt@rozmowni.pl?subject=Wypisz%20mnie"
                style={unsubscribeLink}
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

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '900px',
  width: '100%',
};

const header = {
  padding: '20px 30px',
  textAlign: 'center',
};

const logo = {
  margin: '0 auto',
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
};

const content = {
  padding: '0 30px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
};

const h2 = {
  color: '#1f2937',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 20px',
  padding: '0',
};

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
  padding: '0',
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 15px',
};

const resultsCard = {
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  padding: '30px',
  margin: '30px 0',
  border: '1px solid #e2e8f0',
};

const scoreSection = {
  textAlign: 'center',
  margin: '20px 0',
};

const scoreText = {
  color: '#059669',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 20px',
};

const levelText = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const testTypeText = {
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'center',
  margin: '10px 0 0',
};

const levelDescription = {
  backgroundColor: '#fef3c7',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  border: '1px solid #f59e0b',
};

const ebookSection = {
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  padding: '25px',
  margin: '25px 0',
  border: '1px solid #10b981',
  textAlign: 'center',
};

const button = {
  backgroundColor: '#059669',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  padding: '12px 24px',
  margin: '20px 0',
};

const nextSteps = {
  margin: '30px 0',
};

const list = {
  margin: '15px 0',
  paddingLeft: '20px',
  width: '100%',
};

const listItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
};

const benefitsSection = {
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
  padding: '25px',
  margin: '25px 0',
  border: '1px solid #0ea5e9',
};

const benefitsList = {
  margin: '15px 0',
  width: '100%',
};

const benefitItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '12px 0',
};

const faqSection = {
  backgroundColor: '#fefce8',
  borderRadius: '8px',
  padding: '25px',
  margin: '25px 0',
  border: '1px solid #eab308',
};

const faqItem = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '15px 0',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
};

const testimonialsSection = {
  backgroundColor: '#fdf2f8',
  borderRadius: '8px',
  padding: '25px',
  margin: '25px 0',
  border: '1px solid #ec4899',
};

const testimonial = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '15px 0',
  padding: '15px',
  backgroundColor: '#ffffff',
  borderRadius: '6px',
  border: '1px solid #e5e7eb',
  fontStyle: 'italic',
};

const socialProofSection = {
  backgroundColor: '#ecfdf5',
  borderRadius: '8px',
  padding: '25px',
  margin: '25px 0',
  border: '1px solid #10b981',
  textAlign: 'center',
};

const socialProofText = {
  color: '#065f46',
  fontSize: '18px',
  lineHeight: '26px',
  margin: '0 0 15px',
  fontWeight: 'bold',
};

const socialProofStats = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '32px',
  margin: '15px 0',
};

const contactSection = {
  backgroundColor: '#f3f4f6',
  borderRadius: '8px',
  padding: '20px',
  margin: '25px 0',
};

const link = {
  color: '#059669',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '40px 0',
};

const footer = {
  padding: '0 30px',
  textAlign: 'center',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '5px 0',
};

const unsubscribeText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '16px 0 0',
};

const unsubscribeLink = {
  color: '#9ca3af',
  textDecoration: 'underline',
};

export default TestResultsEmail;
