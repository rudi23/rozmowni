import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { decryptEmail } from '../utils';
import { routeMap, routeNames, routeTitles } from '../routes';

const socials = [
  {
    href: 'https://www.facebook.com/Rozmownipl-141305311401481',
    icon: faFacebookF,
    label: 'Facebook',
    event: 'FOOTER_CLICK_FB',
  },
  {
    href: 'https://www.instagram.com/rozmowni.pl/',
    icon: faInstagram,
    label: 'Instagram',
    event: 'FOOTER_CLICK_IG',
  },
  {
    href: 'https://www.tiktok.com/@rozmowni.pl',
    icon: faTiktok,
    label: 'TikTok',
    event: 'FOOTER_CLICK_TIKTOK',
  },
  {
    href: 'https://www.linkedin.com/in/ma%C5%82gorzata-rudowska-08a29a219/',
    icon: faLinkedin,
    label: 'LinkedIn',
    event: 'FOOTER_CLICK_LINKEDIN',
  },
];

const courseRoutes = [
  [routeNames.HOLIDAY_COURSE, 'Intensywne kursy wakacyjne'],
  [routeNames.INDIVIDUAL_COURSE, 'Zajęcia indywidualne'],
  [routeNames.GROUP_COURSE, 'Zajęcia grupowe'],
  [routeNames.EXAM_8_COURSE, 'Egzamin 8-klasisty'],
  [routeNames.MATURA_EXAM_COURSE, 'Egzamin maturalny'],
];

const siteRoutes = [
  [routeNames.ABOUT_US, 'O nas'],
  [routeNames.PRICING, 'Cennik'],
  [routeNames.CONTACT, 'Kontakt'],
  [routeNames.PRIVACY_POLICY, 'Polityka prywatności'],
];

export default function Footer() {
  const trackClick = useClickTracking();
  const { pathname } = useRouter();
  // Pages that close with a call to action of their own do not need the strip.
  // On /kontakt it landed directly under the form's own send button.
  const hasOwnClosingCta = [
    routeMap[routeNames.HOME],
    routeMap[routeNames.TEST],
    routeMap[routeNames.CONTACT],
  ].includes(pathname);

  const trackMenuItem = (routeName) => () =>
    trackClick(events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeName]));

  return (
    <>
      {!hasOwnClosingCta && (
        <section className="footer-cta">
          <div className="container">
            <div className="footer-cta-inner">
              <p>Nie wiesz, od czego zacząć? Sprawdź swój poziom w 10 minut.</p>
              <Link
                href={routeMap[routeNames.TEST]}
                className="btn btn-main"
                onClick={() => trackClick(events.FOOTER_CLICK_TEST)}
              >
                Zrób bezpłatny test
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget mb-5 mb-lg-0">
                <div className="widget-title">Rozmowni.pl</div>
                <p>
                  Szkoła językowa rozmowni.pl jest dla Ciebie jeśli chcesz nie
                  tylko podnosić swój poziom angielskiego, ale także rozmawiać
                  swobodnie po angielsku na tematy ważne dla Ciebie.
                </p>
                <ul className="footer-socials">
                  {socials.map(({ href, icon, label, event }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        title={label}
                        aria-label={label}
                        onClick={() => trackClick(events[event])}
                      >
                        <FontAwesomeIcon icon={icon} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget mb-5 mb-lg-0">
                <div className="widget-title">Kursy</div>
                <ul className="footer-links">
                  {courseRoutes
                    .filter(([routeName]) => routeMap[routeName])
                    .map(([routeName, label]) => (
                      <li key={routeName}>
                        <Link
                          href={routeMap[routeName]}
                          onClick={trackMenuItem(routeName)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6">
              <div className="footer-widget mb-5 mb-lg-0">
                <div className="widget-title">Szkoła</div>
                <ul className="footer-links">
                  {siteRoutes.map(([routeName, label]) => (
                    <li key={routeName}>
                      <Link
                        href={routeMap[routeName]}
                        onClick={trackMenuItem(routeName)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="footer-widget footer-contact mb-5 mb-lg-0">
                <div className="widget-title">Kontakt</div>
                {/* The icon and the value say what each row is; the bold
                    "Telefon" / "Email" / "Biuro" above them doubled the
                    height of the column for nothing. */}
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                    <a
                      href="tel:+48506262227"
                      onClick={() => trackClick(events.FOOTER_CLICK_PHONE)}
                    >
                      +48 506 262 227
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                    <a
                      href="#"
                      onClick={(e) => {
                        decryptEmail('a29udGFrdEByb3ptb3duaS5wbA==');
                        trackClick(events.FOOTER_CLICK_EMAIL);
                        e.preventDefault();
                      }}
                    >
                      kontakt@rozmowni.pl
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
                    <span>Witkowicka 68G/1, 31-242 Kraków</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-btm">
            <p className="copyright">© 2026 Rozmowni.pl</p>
          </div>
        </div>
      </footer>
    </>
  );
}
