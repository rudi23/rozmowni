// import './Header.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import cx from 'classnames';
import { useEffect, useRef, useState } from 'react';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames, routeTitles } from '../routes';
import logoImage from '../../public/images/logo-rozmowni.png';

function MenuMobile({ isOpen, onToggleClick, onLinkClick }) {
  return (
    <>
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarMenu"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
        onClick={onToggleClick}
      >
        <span className="icon">
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} />
        </span>
      </button>
      <div
        className={
          isOpen ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'
        }
        id="navbarMenu"
      >
        <ul className="navbar-nav ms-auto">
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
      <ul className="navbar-nav ms-auto">
        <li
          data-key="refresh"
          className={
            isDropDownOpen ? 'nav-item dropdown show' : 'nav-item dropdown'
          }
        >
          <div
            className="nav-link dropdown-toggle"
            id="navbar3"
            role="button"
            tabIndex={0}
            aria-haspopup="true"
            aria-expanded={isDropDownOpen}
            onClick={onDropdownClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onDropdownClick();
              }
            }}
          >
            Kursy
            <span className="icon">
              <FontAwesomeIcon icon={faAngleDown} />
            </span>
          </div>
          <div
            className={isDropDownOpen ? 'dropdown-menu show' : 'dropdown-menu '}
            aria-labelledby="navbar3"
          >
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
  );
}

export default function Header() {
  const trackClick = useClickTracking();
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const [width, setWidth] = useState(1600);
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // The bar only grows a shadow once there is page behind it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Two different measurements. --header-h is how tall the sticky bar is, for
  // anything sticking under it. --header-bottom is where it currently ends:
  // the announcement above pushes the bar down until the page scrolls past it,
  // and the mobile sheet has to start below whatever is on screen right now.
  useEffect(() => {
    const publishOffset = () => {
      const bar = headerRef.current;
      if (!bar) {
        return;
      }
      const root = document.documentElement.style;
      root.setProperty('--header-h', `${bar.offsetHeight}px`);
      root.setProperty(
        '--header-bottom',
        `${Math.max(0, Math.round(bar.getBoundingClientRect().bottom))}px`,
      );
    };
    publishOffset();
    window.addEventListener('resize', publishOffset);
    window.addEventListener('scroll', publishOffset, { passive: true });

    return () => {
      window.removeEventListener('resize', publishOffset);
      window.removeEventListener('scroll', publishOffset);
    };
  }, [isClient]);

  // Nothing scrolls behind an open sheet.
  useEffect(() => {
    const locked = isOpen && width <= 976;
    document.body.style.overflow = locked ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, width]);

  // Picking a link closes whatever it was picked from. Toggling here left the
  // courses panel open on the page it navigated to.
  useEffect(() => {
    setOpen(false);
    setDropDownOpen(false);
    // Focus left inside the panel would keep it in view after navigating.
    document.activeElement?.blur?.();
  }, [router.asPath]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDropDownOpen(false);
        setOpen(false);
      }
    };
    const onPointerDown = (event) => {
      if (!event.target.closest?.('.nav-item.dropdown')) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, []);

  const onLinkClick = (routeName) => () => {
    trackClick(events.NAVIGATION_CLICK_MENU_ITEM(routeTitles[routeName]));
    setOpen(false);
    setDropDownOpen(false);
  };
  const onToggleClick = () => {
    setOpen(!isOpen);
  };
  const onDropdownClick = () => {
    if (width >= 992) {
      setDropDownOpen((wasOpen) => !wasOpen);
    }
  };

  return (
    <header
      ref={headerRef}
      className={cx('site-navigation', { 'is-scrolled': isScrolled })}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link
            href={routeMap[routeNames.HOME]}
            className="navbar-brand"
            onClick={() => trackClick(events.NAVIGATION_CLICK_LOGO)}
            title="Strona główna"
          >
            <Image
              src={logoImage}
              alt="Logo rozmowni.pl"
              width="200"
              height="51"
              quality="100"
              priority
            />
          </Link>
          {!isClient ? (
            // Server-side render both menus to prevent hydration mismatch
            <>
              <MenuMobile
                isOpen={isOpen}
                onToggleClick={onToggleClick}
                onLinkClick={onLinkClick}
              />
              <MenuDesktop
                isDropDownOpen={isDropDownOpen}
                onDropdownClick={onDropdownClick}
                onLinkClick={onLinkClick}
              />
            </>
          ) : width <= 976 ? (
            <MenuMobile
              isOpen={isOpen}
              onToggleClick={onToggleClick}
              onLinkClick={onLinkClick}
            />
          ) : (
            <MenuDesktop
              isDropDownOpen={isDropDownOpen}
              onDropdownClick={onDropdownClick}
              onLinkClick={onLinkClick}
            />
          )}
        </div>
      </nav>
    </header>
  );
}
