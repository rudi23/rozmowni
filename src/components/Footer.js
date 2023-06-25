// import './Footer.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faLinkedin, faTiktok } from '@fortawesome/free-brands-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { decryptEmail } from '../utils';
import { routeMap, routeNames, routeTitles } from '../routes';

export default function Footer() {
    const trackClick = useClickTracking();

    return (
        <section className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mr-auto col-sm-6 col-md-6">
                        <div className="widget footer-widget mb-5 mb-lg-0">
                            <div className="widget-title">O nas</div>
                            <p className="mt-3">
                                Szkoła językowa rozmowni.pl jest dla Ciebie jeśli chcesz nie tylko podnosić swój poziom
                                angielskiego, ale także rozmawiać swobodnie po angielsku na tematy ważne dla Ciebie.
                            </p>
                            <ul className="list-inline footer-socials">
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.facebook.com/Rozmownipl-141305311401481"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackClick(events.FOOTER_CLICK_FB)}
                                        title="Facebook profile page"
                                    >
                                        {' '}
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.instagram.com/rozmowni.pl/"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackClick(events.FOOTER_CLICK_IG)}
                                        title="Instagram profile page"
                                    >
                                        {' '}
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.tiktok.com/@rozmowni.pl"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackClick(events.FOOTER_CLICK_TIKTOK)}
                                        title="TikTok profile page"
                                    >
                                        {' '}
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a
                                        href="https://www.linkedin.com/in/ma%C5%82gorzata-rudowska-08a29a219/"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => trackClick(events.FOOTER_CLICK_LINKEDIN)}
                                        title="Linkedin profile page"
                                    >
                                        {' '}
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 col-sm-6 col-md-6">
                        <div className="footer-widget mb-5 mb-lg-0">
                            <div className="widget-title">Rozmowni.pl</div>
                            <ul className="list-unstyled footer-links">
                                <li>
                                    <Link href={routeMap[routeNames.WHY_US]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.WHY_US])
                                                )
                                            }
                                        >
                                            Dlaczego my?
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.ABOUT_US]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.ABOUT_US])
                                                )
                                            }
                                        >
                                            O nas
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.PRICING]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.PRICING])
                                                )
                                            }
                                        >
                                            Cennik
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.CONTACT]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.CONTACT])
                                                )
                                            }
                                        >
                                            Kontakt
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.PRIVACY_POLICY]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(
                                                        routeTitles[routeNames.PRIVACY_POLICY]
                                                    )
                                                )
                                            }
                                        >
                                            Polityka prywatności
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-2 col-sm-6 col-md-6">
                        <div className="footer-widget mb-5 mb-lg-0">
                            <div className="widget-title">Kursy</div>
                            <ul className="list-unstyled footer-links">
                                <li>
                                    <Link href={routeMap[routeNames.HOLIDAY_COURSE]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeNames[routeNames.HOLIDAY_COURSE])
                                                )
                                            }
                                        >
                                            Intensywne kursy wakacyjne
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.INDIVIDUAL_COURSE]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(
                                                        routeNames[routeNames.INDIVIDUAL_COURSE]
                                                    )
                                                )
                                            }
                                        >
                                            Zajęcia indywidualne
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.GROUP_COURSE]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.GROUP_COURSE])
                                                )
                                            }
                                        >
                                            Zajęcia grupowe
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.EXAM_8_COURSE]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(routeTitles[routeNames.EXAM_8_COURSE])
                                                )
                                            }
                                        >
                                            Egzamin 8-klasisty
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={routeMap[routeNames.MATURA_EXAM_COURSE]}>
                                        <a
                                            onClick={() =>
                                                trackClick(
                                                    events.FOOTER_CLICK_MENU_ITEM(
                                                        routeTitles[routeNames.MATURA_EXAM_COURSE]
                                                    )
                                                )
                                            }
                                        >
                                            Egzamin maturalny
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="footer-widget footer-contact mb-5 mb-lg-0">
                            <div className="widget-title">Kontakt</div>

                            <ul className="list-unstyled">
                                <li>
                                    <i className="bi bi-headphone" />
                                    <div>
                                        <strong>Telefon</strong>
                                        <a
                                            href="tel:+48506262227"
                                            onClick={() => trackClick(events.FOOTER_CLICK_PHONE)}
                                        >
                                            +48 506 262 227
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <i className="bi bi-envelop" />
                                    <div>
                                        <strong>Email</strong>
                                        {/* eslint-disable jsx-a11y/anchor-is-valid  */}
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
                                    </div>
                                </li>
                                <li>
                                    <i className="bi bi-location-pointer" />
                                    <div>
                                        <strong>Biuro</strong>
                                        Witkowicka 68G/1
                                        <br />
                                        31-242 Kraków
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-btm">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-12">
                            <div className="copyright text-lg-center">
                                <p>Copyright © 2022 by Rozmowni.pl | All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
