import CookieConsentCore from 'react-cookie-consent';
import Link from 'next/link';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeNames, routeMap } from '../routes';

// A compact card in the corner. The old full-width dark bar covered
// close to a third of a phone screen.
const card = {
  left: '16px',
  right: 'auto',
  bottom: '16px',
  width: 'min(380px, calc(100vw - 32px))',
  display: 'block',
  padding: '20px',
  background: '#fff',
  color: 'var(--color-text)',
  border: '1px solid var(--color-line)',
  borderRadius: 'var(--radius-card)',
  boxShadow: 'var(--shadow-raised)',
  fontSize: '14px',
  lineHeight: '1.55',
  zIndex: 9999,
};

const content = {
  flex: 'auto',
  margin: '0 0 16px',
};

const button = {
  margin: '0',
  padding: '12px 20px',
  background: 'transparent',
  color: 'var(--color-navy)',
  border: '1.5px solid var(--color-navy)',
  borderRadius: 'var(--radius-control)',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: '700',
  fontSize: '14px',
  lineHeight: '1.2',
};

export function CookieConsent() {
  const trackClick = useClickTracking();

  return (
    <CookieConsentCore
      location="bottom"
      buttonText="Akceptuję"
      cookieName="cookieConsent"
      style={card}
      contentStyle={content}
      buttonStyle={button}
      expires={90}
    >
      Używamy plików cookies, aby poprawić funkcjonalność strony. Możesz je
      wyłączyć w ustawieniach przeglądarki. Więcej w naszej{' '}
      <Link
        href={routeMap[routeNames.PRIVACY_POLICY]}
        onClick={() => trackClick(events.COOKIE_CONSENT_CLICK_PRIVACY_POLICY)}
        style={{ color: 'var(--color-teal-dark)', textDecoration: 'underline' }}
      >
        polityce prywatności
      </Link>
      .
    </CookieConsentCore>
  );
}
