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

function ContactFormNotificationEmail({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rozmowni.pl';

  const details = [
    { label: 'Imię i nazwisko', value: name },
    { label: 'Email', value: email, href: `mailto:${email}` },
    { label: 'Telefon', value: phone, href: `tel:${phone}` },
    { label: 'Temat', value: subject },
  ];

  return (
    <Html>
      <Head />
      <Preview>Nowa wiadomość z formularza kontaktowego - {subject}</Preview>
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
              Nowa wiadomość z formularza kontaktowego
            </Heading>

            <Text style={theme.textMuted}>
              Otrzymano nową wiadomość z formularza kontaktowego na stronie
              Rozmowni.pl.
            </Text>

            <Section style={theme.cardSubtle}>
              <Heading style={theme.h2}>Dane kontaktowe</Heading>
              {details.map(({ label, value, href }) => (
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

            <Section style={theme.card}>
              <Heading style={theme.h2}>Treść wiadomości</Heading>
              <Text style={messageText}>{message}</Text>
            </Section>

            <Section style={actionsSection}>
              <Heading style={theme.h2}>Szybkie akcje</Heading>
              <Row>
                <Column style={theme.actionColumnLeft}>
                  <Link
                    href={`mailto:${email}?subject=Odpowiedź: ${subject}`}
                    style={theme.buttonBlock}
                  >
                    Odpowiedz na email
                  </Link>
                </Column>
                <Column style={theme.actionColumnRight}>
                  <Link
                    href={`tel:${phone}`}
                    style={theme.buttonBlockSecondary}
                  >
                    Zadzwoń
                  </Link>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={theme.hr} />

          <Section style={theme.footer}>
            <Text style={theme.footerText}>
              Wiadomość została wysłana automatycznie z formularza kontaktowego
              na stronie{' '}
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
}

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

const messageText = {
  color: theme.colors.text,
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap',
};

const actionsSection = {
  margin: '24px 0 0',
};

export default ContactFormNotificationEmail;
