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
    const trackClick = useClickTracking();

    useEffect(() => {
        const handleScroll = () => {
            // Pokaż sticky CTA po przewinięciu 500px
            const scrolled = window.scrollY > 500;
            setIsVisible(scrolled);
        };

        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Sprawdź przy pierwszym załadowaniu
        handleScroll();
        checkIsMobile();

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const handleMinimize = () => {
        setIsMinimized(true);
        // Auto-restore po 10 sekundach
        setTimeout(() => setIsMinimized(false), 10000);
    };

    const handleCTAClick = () => {
        trackClick(events.HOME_STICKY_CTA_CLICK_TEST);
    };

    if (!isVisible) return null;

    return (
        <div className={`${styles.stickyCTA} ${isMinimized ? styles.minimized : ''}`}>
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
                    <button className={styles.minimizeButton} onClick={handleMinimize} aria-label="Zminimalizuj">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className={styles.ctaText}>
                        <div className={styles.ctaTitle}>{isMobile ? 'Sprawdź poziom!' : 'Sprawdź swój poziom!'}</div>
                        <div className={styles.ctaSubtitle}>
                            {isMobile ? 'Test + lekcja + e-book' : 'Darmowy test + lekcja próbna + e-book'}
                        </div>
                    </div>

                    <Link href={routeMap[routeNames.TEST]}>
                        <a className={styles.ctaButton} onClick={handleCTAClick}>
                            <FontAwesomeIcon icon={faPlay} className="mr-1" />
                            ZRÓB TEST
                        </a>
                    </Link>
                </div>
            )}
        </div>
    );
}
