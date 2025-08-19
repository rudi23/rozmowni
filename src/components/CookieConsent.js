import CookieConsentCore from 'react-cookie-consent';
import Link from 'next/link';
import { routeNames, routeMap } from '../routes';

export function CookieConsent() {
  return (
    <CookieConsentCore
      location="bottom"
      buttonText="Akceptuję"
      cookieName="cookieConsent"
      style={{
        background: 'rgba(7, 41, 77, 0.98)',
        color: 'rgba(255, 255, 255, 0.8)',
        alignItems: 'center',
        fontSize: '14px',
        zIndex: 9999,
      }}
      buttonStyle={{
        fontSize: '14px',
        color: '#fff',
        borderColor: '#0f8d8c',
        background: '#0f8d8c',
        fontWeight: '500',
        borderRadius: '5px',
        fontFamily: 'Montserrat, sans-serif',
        padding: '8px 15px',
      }}
      expires={90}
    >
      Używamy plików cookies, aby poprawić funkcjonalność strony. Możesz je
      wyłączyć w ustawieniach przeglądarki. Więcej w naszej{' '}
      <Link href={routeMap[routeNames.PRIVACY_POLICY]}>
        polityce prywatności.
      </Link>
    </CookieConsentCore>
  );
}
