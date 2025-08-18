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
            Nasza strona internetowa używa plików cookies (tzw. ciasteczka) w celach statystycznych, reklamowych oraz
            funkcjonalnych. Dzięki nim możemy indywidualnie dostosować stronę do twoich potrzeb. Każdy może zaakceptować
            pliki cookies albo ma możliwość wyłączenia ich w przeglądarce, dzięki czemu nie będą zbierane żadne
            informacje. Dowiedz się{' '}
            <a href="http://ciasteczka.eu/#jak-wylaczyc-ciasteczka" target="_blank" rel="noreferrer">
                jak je wyłączyć.
            </a>{' '}
            Więcej możesz przeczytać w naszej{' '}
            <Link href={routeMap[routeNames.PRIVACY_POLICY]}>polityce prywatnosci.</Link>
        </CookieConsentCore>
    );
}
