/* eslint-disable no-use-before-define */
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from '@react-email/components';

function ContactFormNotificationEmail({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rozmowni.pl';

  return (
    <Html>
      <Head />
      <Preview>Nowa wiadomość z formularza kontaktowego - {subject}</Preview>
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
              Nowa wiadomość z formularza kontaktowego
            </Heading>

            <Text style={introText}>
              Otrzymano nową wiadomość z formularza kontaktowego na stronie
              Rozmowni.pl.
            </Text>

            {/* Contact Details */}
            <Section style={detailsSection}>
              <Heading style={h2}>Dane kontaktowe</Heading>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Imię i nazwisko:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{name}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Email:</Text>
                </Column>
                <Column style={detailValue}>
                  <Link href={`mailto:${email}`} style={emailLink}>
                    {email}
                  </Link>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Telefon:</Text>
                </Column>
                <Column style={detailValue}>
                  <Link href={`tel:${phone}`} style={phoneLink}>
                    {phone}
                  </Link>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={labelText}>Temat:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={valueText}>{subject}</Text>
                </Column>
              </Row>
            </Section>

            {/* Message Content */}
            <Section style={messageSection}>
              <Heading style={h2}>Treść wiadomości</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Quick Actions */}
            <Section style={actionsSection}>
              <Heading style={h2}>Szybkie akcje</Heading>

              <Row style={actionRow}>
                <Column style={actionColumn}>
                  <Link
                    href={`mailto:${email}?subject=Odpowiedź: ${subject}`}
                    style={actionButton}
                  >
                    Odpowiedz na email
                  </Link>
                </Column>
                <Column style={actionColumn}>
                  <Link href={`tel:${phone}`} style={actionButtonSecondary}>
                    Zadzwoń
                  </Link>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={hr} />

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Wiadomość została wysłana automatycznie z formularza kontaktowego
              na stronie{' '}
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
}

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

const emailLink = {
  color: '#2563eb',
  fontSize: '14px',
  textDecoration: 'underline',
  margin: '0',
};

const phoneLink = {
  color: '#2563eb',
  fontSize: '14px',
  textDecoration: 'underline',
  margin: '0',
};

const messageSection = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e7eb',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const messageText = {
  color: '#1f2937',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  whiteSpace: 'pre-wrap',
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

const actionButtonSecondary = {
  backgroundColor: '#10b981',
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

export default ContactFormNotificationEmail;
