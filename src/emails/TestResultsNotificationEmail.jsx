/* eslint-disable no-use-before-define */
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as theme from './theme';

const TestResultsNotificationEmail = ({
  fullName,
  email,
  phone,
  contactMethod,
  testScore,
  testLevel,
  testType,
  totalQuestions,
}) => {
  const score = parseInt(testScore.split('/')[0]);
  const percentage = Math.round((score / totalQuestions) * 100);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rozmowni.pl';
  const preferredContact = contactMethod === 'phone' ? 'Telefon' : 'Email';

  const assessment =
    percentage >= 80
      ? 'Bardzo dobry poziom znajomości języka.'
      : percentage >= 60
        ? 'Solidna podstawa, jest miejsce na rozwój.'
        : 'Wymaga systematycznej nauki i wsparcia.';

  const userDetails = [
    { label: 'Imię i nazwisko', value: fullName },
    { label: 'Email', value: email, href: `mailto:${email}` },
    ...(phone
      ? [{ label: 'Telefon', value: phone, href: `tel:${phone}` }]
      : []),
    { label: 'Preferowany kontakt', value: preferredContact },
    {
      label: 'Typ testu',
      value:
        testType === 'adults'
          ? 'Test dla dorosłych'
          : 'Test dla młodzieży (11-16 lat)',
    },
  ];

  const results = [
    ['Wynik', `${testScore} (${percentage}%)`],
    ['Poziom', testLevel],
    ['Liczba pytań', String(totalQuestions)],
    ['Ocena', assessment],
  ];

  return (
    <Html>
      <Head />
      <Preview>Nowy użytkownik ukończył test poziomujący - {fullName}</Preview>
      <Body style={theme.main}>
        <Container style={theme.container}>
          <Section style={theme.header}>
            <Img
              src={`${baseUrl}/images/logo-rozmowni.png`}
              width="250"
              height="75"
              alt="Rozmowni.pl"
              style={theme.logo}
            />
          </Section>

          <Hr style={theme.hr} />

          <Section style={theme.content}>
            <Heading style={theme.h1}>
              Nowy użytkownik ukończył test poziomujący
            </Heading>

            <Text style={theme.textMuted}>
              Ktoś właśnie ukończył test poziomujący na stronie Rozmowni.pl i
              wypełnił formularz kontaktowy.
            </Text>

            <Section style={theme.cardSubtle}>
              <Heading style={theme.h2}>Dane użytkownika</Heading>
              {userDetails.map(({ label, value, href }) => (
                <Row style={detailRow} key={label}>
                  <Column style={detailLabel}>
                    <Text style={labelText}>{label}</Text>
                  </Column>
                  <Column style={detailValue}>
                    {href ? (
                      <Link href={href} style={theme.link}>
                        {value}
                      </Link>
                    ) : (
                      <Text style={valueText}>{value}</Text>
                    )}
                  </Column>
                </Row>
              ))}
            </Section>

            <Section style={theme.cardTinted}>
              <Heading style={theme.h2}>Wyniki testu</Heading>
              {results.map(([label, value]) => (
                <Row style={detailRow} key={label}>
                  <Column style={detailLabel}>
                    <Text style={labelText}>{label}</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={valueText}>{value}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Section style={theme.card}>
              <Heading style={theme.h2}>Następne kroki</Heading>
              <Text style={theme.text}>
                Użytkownik otrzymał email z wynikami testu oraz darmowym
                e-bookiem. Oczekuje na kontakt w celu umówienia bezpłatnej
                lekcji próbnej. Preferowany sposób kontaktu:{' '}
                <strong style={strong}>{preferredContact}</strong>.
              </Text>
              <Text style={{ ...theme.textMuted, margin: '0' }}>
                Skontaktuj się w ciągu 24 godzin, aby zwiększyć szansę na
                konwersję.
              </Text>
            </Section>

            <Section style={actionsSection}>
              <Heading style={theme.h2}>Szybkie akcje</Heading>
              <Row>
                <Column style={theme.actionColumnLeft}>
                  <Link
                    href={`mailto:${email}?subject=Bezpłatna lekcja próbna - Rozmowni.pl`}
                    style={theme.buttonBlock}
                  >
                    Wyślij email
                  </Link>
                </Column>
                {phone && (
                  <Column style={theme.actionColumnRight}>
                    <Link
                      href={`tel:${phone}`}
                      style={theme.buttonBlockSecondary}
                    >
                      Zadzwoń
                    </Link>
                  </Column>
                )}
              </Row>
            </Section>
          </Section>

          <Hr style={theme.hr} />

          <Section style={theme.footer}>
            <Text style={theme.footerText}>
              Powiadomienie automatyczne z systemu testów poziomujących{' '}
              <Link href={baseUrl} style={theme.footerLink}>
                Rozmowni.pl
              </Link>
            </Text>
            <Text style={theme.footerText}>
              © {new Date().getFullYear()} Rozmowni.pl — Wszystkie prawa
              zastrzeżone
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const detailRow = {
  margin: '0 0 10px',
};

const detailLabel = {
  width: '38%',
  verticalAlign: 'top',
};

const detailValue = {
  width: '62%',
  verticalAlign: 'top',
};

const labelText = {
  color: theme.colors.textMuted,
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const valueText = {
  color: theme.colors.navy,
  fontSize: '14px',
  margin: '0',
};

const strong = {
  color: theme.colors.navy,
};

const actionsSection = {
  margin: '24px 0 0',
};

export default TestResultsNotificationEmail;
