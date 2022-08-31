// import './Header.scss';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
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
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.WHY_US]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.WHY_US)}>
                                Dlaczego my?
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.ABOUT_US]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.ABOUT_US)}>
                                O nas
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.INDIVIDUAL_COURSE]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.INDIVIDUAL_COURSE)}>
                                Kursy indywidualne
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.GROUP_COURSE]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.GROUP_COURSE)}>
                                Kursy grupowe
                            </a>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link href={routeMap[routeNames.EXAM_8_COURSE]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.EXAM_8_COURSE)}>
                                Egzamin 8-klasisty
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.MATURA_EXAM_COURSE]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.MATURA_EXAM_COURSE)}>
                                Egzamin maturalny
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.PRICING]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.PRICING)}>
                                Cennik
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href={routeMap[routeNames.CONTACT]}>
                            <a className="nav-link" onClick={onLinkClick(routeNames.CONTACT)}>
                                Kontakt
                            </a>
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
                <li className="nav-item">
                    <Link href={routeMap[routeNames.WHY_US]}>
                        <a className="nav-link" onClick={onLinkClick(routeNames.WHY_US)}>
                            Dlaczego my?
                        </a>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link href={routeMap[routeNames.ABOUT_US]}>
                        <a className="nav-link" onClick={onLinkClick(routeNames.ABOUT_US)}>
                            O nas
                        </a>
                    </Link>
                </li>
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
                        <Link href={routeMap[routeNames.INDIVIDUAL_COURSE]}>
                            <a className="dropdown-item" onClick={onLinkClick(routeNames.INDIVIDUAL_COURSE)}>
                                Indywidualne
                            </a>
                        </Link>
                        <Link href={routeMap[routeNames.GROUP_COURSE]}>
                            <a className="dropdown-item" onClick={onLinkClick(routeNames.GROUP_COURSE)}>
                                Grupowe
                            </a>
                        </Link>
                        <Link href={routeMap[routeNames.EXAM_8_COURSE]}>
                            <a className="dropdown-item" onClick={onLinkClick(routeNames.EXAM_8_COURSE)}>
                                Egzamin 8-klasisty
                            </a>
                        </Link>
                        <Link href={routeMap[routeNames.MATURA_EXAM_COURSE]}>
                            <a className="dropdown-item" onClick={onLinkClick(routeNames.MATURA_EXAM_COURSE)}>
                                Egzamin maturalny
                            </a>
                        </Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link href={routeMap[routeNames.PRICING]}>
                        <a className="nav-link" onClick={onLinkClick(routeNames.PRICING)}>
                            Cennik
                        </a>
                    </Link>
                </li>
                <li className="nav-item ">
                    <Link href={routeMap[routeNames.CONTACT]}>
                        <a className="nav-link" onClick={onLinkClick(routeNames.CONTACT)}>
                            Kontakt
                        </a>
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
    const width = useWindowWidth({ initialWidth: 1600 });

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
                    <div className="container pl-3 pr-3">
                        <Link href={routeMap[routeNames.HOME]}>
                            <a
                                className="navbar-brand"
                                onClick={() => trackClick(events.NAVIGATION_CLICK_LOGO)}
                                title="Strona główna"
                            >
                                <Image
                                    src={logoImage}
                                    alt="Logo rozmowni.pl"
                                    width="200px"
                                    height="51px"
                                    layout="fixed"
                                    quality="100"
                                />
                            </a>
                        </Link>
                        {width <= 976 ? (
                            <MenuMobile isOpen={isOpen} onToggleClick={onToggleClick} onLinkClick={onLinkClick} />
                        ) : (
                            <MenuDesktop
                                isDropDownOpen={isDropDownOpen}
                                onDropdownClick={onDropdownClick}
                                onLinkClick={onLinkClick}
                            />
                        )}

                        <div className="header-contact-phone d-none d-lg-block">
                            <span>Tel.:</span>&nbsp;
                            <a
                                href="tel:+48506262227"
                                onClick={() => trackClick(events.NAVIGATION_CLICK_PHONE)}
                                title="Zadzwoń"
                            >
                                506 262 227
                            </a>
                        </div>

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
                                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
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
                                        <FontAwesomeIcon icon={['fab', 'instagram']} />
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
                                        <FontAwesomeIcon icon={['fab', 'tiktok']} />
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
