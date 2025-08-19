/* eslint-disable no-use-before-define */
import {
  Body,
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
  Row,
  Column,
} from '@react-email/components';

const TestResultsNotificationEmail = ({
  fullName,
  email,
  testScore,
  testLevel,
  testType,
  totalQuestions,
}) => {
  const score = parseInt(testScore.split('/')[0]);
  const percentage = Math.round((score / totalQuestions) * 100);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rozmowni.pl';

  return (
    <Html>
      <Head />
      <Preview>Nowy użytkownik ukończył test poziomujący - {fullName}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/logo-rozmowni.png`}
              width="250"
              height="75"
              alt="Rozmowni.pl"
              style={logo}
            />
          </Section>

          <Hr style={hr} />

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>
              Nowy użytkownik ukończył test poziomujący! 🎉
            </Heading>

            <Text style={introText}>
              Ktoś właśnie ukończył test poziomujący na stronie Rozmowni.pl i
              wypełnił formularz kontaktowy.
            </Text>

            {/* User Details */}
            <Section style={detailsSection}>
              <Heading style={h2}>Dane użytkownika</Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Imię i nazwisko:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{fullName}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Typ testu:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>
                    {testType === 'adults'
                      ? 'Test dla dorosłych'
                      : 'Test dla młodzieży (11-16 lat)'}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Test Results */}
            <Section style={resultsSection}>
              <Heading style={h2}>Wyniki testu</Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Wynik:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={scoreText}>
                    {testScore} ({percentage}%)
                  </Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Poziom:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={levelText}>{testLevel}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Liczba pytań:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{totalQuestions}</Text>
                </Column>
              </Row>
            </Section>

            {/* Performance Analysis */}
            <Section style={analysisSection}>
              <Heading style={h2}>Analiza wyników</Heading>

              <Text style={analysisText}>
                <strong>Wynik: {percentage}%</strong>
              </Text>

              {percentage >= 80 && (
                <Text style={goodScoreText}>
                  🎯 <strong>Świetny wynik!</strong> Użytkownik ma bardzo dobry
                  poziom znajomości języka angielskiego.
                </Text>
              )}

              {percentage >= 60 && percentage < 80 && (
                <Text style={mediumScoreText}>
                  📈 <strong>Dobry wynik!</strong> Użytkownik ma solidną
                  podstawę, ale jest miejsce na rozwój.
                </Text>
              )}

              {percentage < 60 && (
                <Text style={lowScoreText}>
                  📚 <strong>Potrzebuje wsparcia!</strong> Użytkownik wymaga
                  systematycznej nauki i wsparcia.
                </Text>
              )}
            </Section>

            {/* Next Steps */}
            <Section style={nextStepsSection}>
              <Heading style={h2}>Następne kroki</Heading>

              <Text style={nextStepsText}>
                Użytkownik otrzymał email z wynikami testu oraz darmowym
                e-bookiem. Oczekuje na kontakt w celu umówienia bezpłatnej
                lekcji próbnej.
              </Text>

              <Text style={reminderText}>
                <strong>Pamiętaj:</strong> Skontaktuj się z użytkownikiem w
                ciągu 24 godzin, aby zwiększyć szansę na konwersję.
              </Text>
            </Section>

            {/* Quick Actions */}
            <Section style={actionsSection}>
              <Heading style={h2}>Szybkie akcje</Heading>

              <Row style={actionRow}>
                <Column style={actionColumn}>
                  <Link
                    href={`mailto:${email}?subject=Bezpłatna lekcja próbna - Rozmowni.pl`}
                    style={actionButton}
                  >
                    Wyślij email
                  </Link>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Powiadomienie automatyczne z systemu testów poziomujących{' '}
              <Link href={baseUrl} style={footerLink}>
                Rozmowni.pl
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Rozmowni.pl - Wszystkie prawa
              zastrzeżone
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
  maxWidth: '600px',
};

const header = {
  padding: '20px 40px',
  textAlign: 'center',
};

const logo = {
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const content = {
  padding: '0 40px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
};

const h2 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '30px 0 15px',
  padding: '0',
};

const introText = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '20px 0',
};

const detailsSection = {
  backgroundColor: '#f9fafb',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const resultsSection = {
  backgroundColor: '#f0f9ff',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
  border: '1px solid #bae6fd',
};

const detailRow = {
  margin: '10px 0',
};

const detailLabel = {
  width: '30%',
  verticalAlign: 'top',
};

const detailValue = {
  width: '70%',
  verticalAlign: 'top',
};

const labelText = {
  color: '#374151',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const valueText = {
  color: '#1f2937',
  fontSize: '14px',
  margin: '0',
};

const scoreText = {
  color: '#059669',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const levelText = {
  color: '#2563eb',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const analysisSection = {
  backgroundColor: '#fef3c7',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
  border: '1px solid #fbbf24',
};

const analysisText = {
  color: '#92400e',
  fontSize: '16px',
  margin: '0 0 15px 0',
};

const goodScoreText = {
  color: '#059669',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const mediumScoreText = {
  color: '#d97706',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const lowScoreText = {
  color: '#dc2626',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const nextStepsSection = {
  backgroundColor: '#f3f4f6',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const nextStepsText = {
  color: '#374151',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 15px 0',
};

const reminderText = {
  color: '#dc2626',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '20px',
  margin: '0',
};

const actionsSection = {
  margin: '30px 0',
};

const actionRow = {
  margin: '15px 0',
};

const actionColumn = {
  width: '50%',
  padding: '0 10px',
};

const actionButton = {
  backgroundColor: '#2563eb',
  borderRadius: '6px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '12px 20px',
  margin: '0',
};

const footer = {
  padding: '20px 40px',
  textAlign: 'center',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '5px 0',
};

const footerLink = {
  color: '#2563eb',
  textDecoration: 'underline',
};

export default TestResultsNotificationEmail;
