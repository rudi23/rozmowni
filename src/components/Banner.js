import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCheck, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeNames, routeMap } from '../routes';
import mainImage from '../../public/images/main.jpg';
import styles from './Banner.module.scss';

export default function Banner() {
    const trackClick = useClickTracking();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    const SocialProofBadge = () => (
        <div className={styles.socialProof}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" />
            <span>Ponad 100 zadowolonych uczniów</span>
        </div>
    );

    return (
        <section className={styles.bannerSection}>
            <div className="container">
                <div className={styles.bannerGrid}>
                    {/* Social Proof Row - spans all columns */}
                    <div className={styles.socialProofRow}>
                        <SocialProofBadge />
                    </div>

                    {/* Content Wrapper - combines both parts on desktop */}
                    <div className={styles.contentWrapper}>
                        {/* Content Column - Part 1: School Branding */}
                        <div className={styles.contentColumnTop}>
                            {/* School Branding */}
                            <div className={styles.schoolBranding}>
                                <h1>Mów swobodnie po angielsku!</h1>
                                <p className={styles.schoolInfo}>Indywidualne oraz grupowe kursy online</p>
                            </div>
                        </div>

                        {/* Content Column - Part 2: Test Promotion */}
                        <div className={styles.contentColumnBottom}>
                            {/* Test Promotion */}
                            <div className={styles.testPromotion}>
                                <h2>
                                    Sprawdź swój poziom angielskiego
                                    <br />
                                    za DARMO!
                                </h2>
                                <p className={styles.testDescription}>
                                    Otrzymaj bezpłatną lekcję próbną + spersonalizowany plan nauki + e-book
                                </p>
                            </div>

                            {/* Benefits List */}
                            <div className={styles.benefits}>
                                <div className={styles.benefit}>
                                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                                    <span>Test zajmuje tylko 10 minut</span>
                                </div>
                                <div className={styles.benefit}>
                                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                    <span>Natychmiastowy wynik</span>
                                </div>
                                <div className={styles.benefit}>
                                    <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                    <span>Indywidualne podejście</span>
                                </div>
                            </div>

                            {/* Trust Elements */}
                            <div className={styles.trustElements}>
                                <small>✓ Wynik od razu ✓ Bez spamu ✓ Dane bezpieczne</small>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons Row - spans both columns */}
                    <div className={styles.ctaRow}>
                        <div className={styles.ctaButtons}>
                            <Link href={routeMap[routeNames.TEST]}>
                                <a
                                    className={`btn btn-main ${styles.primaryCta}`}
                                    onClick={() => trackClick(events.HOME_BANNER_CLICK_TEST)}
                                >
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    ZRÓB BEZPŁATNY TEST
                                </a>
                            </Link>

                            <Link href="#dlaczego-my">
                                <a
                                    className={`btn btn-outline ${styles.secondaryCta}`}
                                    onClick={() => trackClick(events.HOME_BANNER_CLICK_LEARN_MORE)}
                                >
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    Zobacz jak uczymy
                                </a>
                            </Link>
                        </div>
                    </div>

                    {/* Image Column */}
                    <div className={styles.imageColumn}>
                        <div className={styles.bannerImage}>
                            <Image
                                src={mainImage}
                                alt="Małgorzata Rudowska przy biurku"
                                placeholder="blur"
                                layout="responsive"
                                sizes="(min-width: 1200px) 500px, (min-width: 992px) 400px, (min-width: 768px) 350px, 100vw"
                                quality="75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
