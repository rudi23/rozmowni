// import './Header.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames, routeTitles } from '../routes';
import logoImage from '../../public/images/logo-rozmowni.png';

library.add(faFacebookF);
library.add(faInstagram);
library.add(faTiktok);

function MenuMobile({ isOpen, onToggleClick, onLinkClick }) {
    return (
        <>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarMenu"
                aria-controls="navbarMenu"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={onToggleClick}
            >
                <span className="icon">
                    <FontAwesomeIcon icon={faBars} />
                </span>
            </button>
            <div className={isOpen ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'} id="navbarMenu">
                <ul className="navbar-nav mx-auto">
                    {routeMap[routeNames.HOLIDAY_COURSE] && (
                        <li className="nav-item">
                            <Link
                                href={routeMap[routeNames.HOLIDAY_COURSE]}
                                className="nav-link"
                                onClick={onLinkClick(routeNames.HOLIDAY_COURSE)}
                            >
                                Intensywne kursy wakacyjne
                            </Link>
                        </li>
                    )}
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.INDIVIDUAL_COURSE]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.INDIVIDUAL_COURSE)}
                        >
                            Kursy indywidualne
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.GROUP_COURSE]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.GROUP_COURSE)}
                        >
                            Kursy grupowe
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.EXAM_8_COURSE]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.EXAM_8_COURSE)}
                        >
                            Egzamin 8-klasisty
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.MATURA_EXAM_COURSE]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.MATURA_EXAM_COURSE)}
                        >
                            Egzamin maturalny
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.PRICING]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.PRICING)}
                        >
                            Cennik
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.ABOUT_US]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.ABOUT_US)}
                        >
                            O nas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            href={routeMap[routeNames.CONTACT]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.CONTACT)}
                        >
                            Kontakt
                        </Link>
                    </li>
                    <li className="nav-item test-cta">
                        <Link
                            href={routeMap[routeNames.TEST]}
                            className="nav-link"
                            onClick={onLinkClick(routeNames.TEST)}
                        >
                            Test poziomujący
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

function MenuDesktop({ isDropDownOpen, onDropdownClick, onLinkClick }) {
    return (
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
                <li data-key="refresh" className={isDropDownOpen ? 'nav-item dropdown show' : 'nav-item dropdown'}>
                    <div
                        className="nav-link dropdown-toggle"
                        id="navbar3"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded={isDropDownOpen}
                        onClick={onDropdownClick}
                    >
                        Kursy
                        <span className="icon">
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </div>
                    <div className={isDropDownOpen ? 'dropdown-menu show' : 'dropdown-menu '} aria-labelledby="navbar3">
                        {routeMap[routeNames.HOLIDAY_COURSE] && (
                            <Link
                                href={routeMap[routeNames.HOLIDAY_COURSE]}
                                className="dropdown-item"
                                onClick={onLinkClick(routeNames.HOLIDAY_COURSE)}
                            >
                                Intensywne kursy wakacyjne
                            </Link>
                        )}
                        <Link
                            href={routeMap[routeNames.INDIVIDUAL_COURSE]}
                            className="dropdown-item"
                            onClick={onLinkClick(routeNames.INDIVIDUAL_COURSE)}
                        >
                            Indywidualne
                        </Link>
                        <Link
                            href={routeMap[routeNames.GROUP_COURSE]}
                            className="dropdown-item"
                            onClick={onLinkClick(routeNames.GROUP_COURSE)}
                        >
                            Grupowe
                        </Link>
                        <Link
                            href={routeMap[routeNames.EXAM_8_COURSE]}
                            className="dropdown-item"
                            onClick={onLinkClick(routeNames.EXAM_8_COURSE)}
                        >
                            Egzamin 8-klasisty
                        </Link>
                        <Link
                            href={routeMap[routeNames.MATURA_EXAM_COURSE]}
                            className="dropdown-item"
                            onClick={onLinkClick(routeNames.MATURA_EXAM_COURSE)}
                        >
                            Egzamin maturalny
                        </Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link
                        href={routeMap[routeNames.PRICING]}
                        className="nav-link"
                        onClick={onLinkClick(routeNames.PRICING)}
                    >
                        Cennik
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href={routeMap[routeNames.ABOUT_US]}
                        className="nav-link"
                        onClick={onLinkClick(routeNames.ABOUT_US)}
                    >
                        O nas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href={routeMap[routeNames.CONTACT]}
                        className="nav-link"
                        onClick={onLinkClick(routeNames.CONTACT)}
                    >
                        Kontakt
                    </Link>
                </li>
                <li className="nav-item test-cta">
                    <Link href={routeMap[routeNames.TEST]} className="nav-link" onClick={onLinkClick(routeNames.TEST)}>
                        Test poziomujący
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default function Header() {
    const trackClick = useClickTracking();
    const [isOpen, setOpen] = useState(false);
    const [isDropDownOpen, setDropDownOpen] = useState(false);
    const [width, setWidth] = useState(1600);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const updateWidth = () => setWidth(window.innerWidth);
        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const onLinkClick = (routeName) => () => {
        trackClick(events.NAVIGATION_CLICK_MENU_ITEM(routeTitles[routeName]));
        setOpen(!isOpen);
    };
    const onToggleClick = () => {
        setOpen(!isOpen);
    };
    const onDropdownClick = () => {
        if (width >= 992) {
            setDropDownOpen(!isDropDownOpen);
        }
    };

    return (
        <header>
            <div className="site-navigation">
                <nav className="navbar navbar-expand-lg">
                    <div className="container pl-3 pe-3">
                        <Link
                            href={routeMap[routeNames.HOME]}
                            className="navbar-brand"
                            onClick={() => trackClick(events.NAVIGATION_CLICK_LOGO)}
                            title="Strona główna"
                        >
                            <Image src={logoImage} alt="Logo rozmowni.pl" width="200" height="51" quality="100" />
                        </Link>
                        {!isClient ? (
                            // Server-side render both menus to prevent hydration mismatch
                            <>
                                <MenuMobile isOpen={isOpen} onToggleClick={onToggleClick} onLinkClick={onLinkClick} />
                                <MenuDesktop
                                    isDropDownOpen={isDropDownOpen}
                                    onDropdownClick={onDropdownClick}
                                    onLinkClick={onLinkClick}
                                />
                            </>
                        ) : width <= 976 ? (
                            <MenuMobile isOpen={isOpen} onToggleClick={onToggleClick} onLinkClick={onLinkClick} />
                        ) : (
                            <MenuDesktop
                                isDropDownOpen={isDropDownOpen}
                                onDropdownClick={onDropdownClick}
                                onLinkClick={onLinkClick}
                            />
                        )}

                        {/* <div className="header-contact-phone d-none d-lg-block">
                            <span>Tel.:</span>&nbsp;
                            <a
                                href="tel:+48506262227"
                                onClick={() => trackClick(events.NAVIGATION_CLICK_PHONE)}
                                title="Zadzwoń"
                            >
                                506 262 227
                            </a>
                        </div> */}

                        <ul className="header-contact-right d-none d-lg-block">
                            <li>
                                <a
                                    href="https://www.facebook.com/Rozmownipl-141305311401481"
                                    onClick={() => trackClick(events.NAVIGATION_CLICK_FB)}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Facebook profile page"
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/rozmowni.pl/"
                                    onClick={() => trackClick(events.NAVIGATION_CLICK_IG)}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="Instagram profile page"
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.tiktok.com/@rozmowni.pl"
                                    onClick={() => trackClick(events.NAVIGATION_CLICK_TIKTOK)}
                                    target="_blank"
                                    rel="noreferrer"
                                    title="TikTok profile page"
                                >
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faTiktok} />
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
}
