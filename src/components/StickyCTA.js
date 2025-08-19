import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes, faRocket } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import styles from './StickyCTA.module.scss';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cookieConsentVisible, setCookieConsentVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const trackClick = useClickTracking();

  // Sprawdź czy StickyCTA powinien się pokazać gdy CookieConsent znika
  useEffect(() => {
    if (!cookieConsentVisible && isInitialized) {
      const hasCookieConsentAccepted =
        localStorage.getItem('cookieConsent') === 'true';
      if (!hasCookieConsentAccepted) {
        const scrolled = window.scrollY > 500;
        if (scrolled) {
          setIsVisible(true);
        }
      }
    }
  }, [cookieConsentVisible, isInitialized]);

  useEffect(() => {
    const handleScroll = () => {
      // Pokaż sticky CTA po przewinięciu 500px, ale tylko jeśli nie ma CookieConsent
      const scrolled = window.scrollY > 500;
      const hasCookieConsent = !!document.querySelector('.CookieConsent');
      const hasCookieConsentAccepted =
        localStorage.getItem('cookieConsent') === 'true';
      const shouldShow =
        scrolled && !hasCookieConsent && !hasCookieConsentAccepted;

      // Tylko zmień stan jeśli się różni, żeby uniknąć niepotrzebnych re-renderów
      if (isVisible !== shouldShow) {
        setIsVisible(shouldShow);
      }
    };

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const checkCookieConsent = () => {
      // Sprawdź czy CookieConsent jest widoczny
      const cookieConsent = document.querySelector('.CookieConsent');
      const isVisible = !!cookieConsent;
      const hasCookieConsentAccepted =
        localStorage.getItem('cookieConsent') === 'true';
      setCookieConsentVisible(isVisible);

      // Jeśli CookieConsent się pojawił, ukryj StickyCTA
      if (isVisible) {
        setIsVisible(false);
      } else if (!hasCookieConsentAccepted) {
        // Jeśli CookieConsent zniknął i nie jest zaakceptowany, sprawdź czy StickyCTA powinien się pokazać
        const scrolled = window.scrollY > 500;
        if (scrolled) {
          setIsVisible(true);
        }
      }
    };

    // Sprawdź przy pierwszym załadowaniu
    checkIsMobile();
    checkCookieConsent();
    handleScroll();

    // Sprawdź czy CookieConsent jest zaakceptowany przy pierwszym załadowaniu
    const hasCookieConsentAccepted =
      localStorage.getItem('cookieConsent') === 'true';
    if (!hasCookieConsentAccepted) {
      const scrolled = window.scrollY > 500;
      if (scrolled) {
        setIsVisible(true);
      }
    }

    // Oznacz jako zainicjalizowany po krótkim opóźnieniu
    setTimeout(() => setIsInitialized(true), 100);

    // Sprawdź co 300ms czy CookieConsent się pojawił/zniknął
    const cookieCheckInterval = setInterval(checkCookieConsent, 300);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkIsMobile);
      clearInterval(cookieCheckInterval);
    };
  }, [cookieConsentVisible, isInitialized, isVisible]);

  const handleMinimize = () => {
    setIsMinimized(true);
    // Auto-restore po 10 sekundach
    setTimeout(() => setIsMinimized(false), 10000);
  };

  const handleCTAClick = () => {
    trackClick(events.HOME_STICKY_CTA_CLICK_TEST);
  };

  if (!isInitialized || !isVisible || cookieConsentVisible) return null;

  return (
    <div
      className={`${styles.stickyCTA} ${isMinimized ? styles.minimized : ''} ${
        cookieConsentVisible ? styles.cookieConsentVisible : ''
      }`}
    >
      {isMinimized ? (
        // Minimized version - tylko ikonka
        <button
          className={styles.expandButton}
          onClick={() => setIsMinimized(false)}
          aria-label="Rozwiń menu testu"
        >
          <FontAwesomeIcon icon={faRocket} />
        </button>
      ) : (
        // Full version
        <div className={styles.ctaContent}>
          <button
            className={styles.minimizeButton}
            onClick={handleMinimize}
            aria-label="Zminimalizuj"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className={styles.ctaText}>
            <div className={styles.ctaTitle}>
              {isMobile ? 'Sprawdź poziom!' : 'Sprawdź swój poziom!'}
            </div>
            <div className={styles.ctaSubtitle}>
              {isMobile
                ? 'Test + lekcja + e-book'
                : 'Darmowy test + lekcja próbna + e-book'}
            </div>
          </div>
          <Link
            href={routeMap[routeNames.TEST]}
            className={styles.ctaButton}
            onClick={handleCTAClick}
          >
            <FontAwesomeIcon icon={faPlay} className="me-1" />
            ZRÓB TEST
          </Link>
        </div>
      )}
    </div>
  );
}
