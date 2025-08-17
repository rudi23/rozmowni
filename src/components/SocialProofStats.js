import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faStar, faGraduationCap, faClock } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import styles from './SocialProofStats.module.scss';

export default function SocialProofStats() {
    const trackClick = useClickTracking();

    return (
        <section className={styles.socialProofSection}>
            <div className="container">
                <div className="row align-items-center">
                    {/* Statystyki */}
                    <div className="col-lg-8">
                        <div className={styles.statsContainer}>
                            <div className={styles.stat}>
                                <FontAwesomeIcon icon={faUsers} className={styles.statIcon} />
                                <div className={styles.number}>100+</div>
                                <div className={styles.label}>Zadowolonych uczniów</div>
                            </div>
                            <div className={styles.stat}>
                                <FontAwesomeIcon icon={faStar} className={styles.statIcon} />
                                <div className={styles.number}>95%</div>
                                <div className={styles.label}>Poleca nas znajomym</div>
                            </div>
                            <div className={styles.stat}>
                                <FontAwesomeIcon icon={faGraduationCap} className={styles.statIcon} />
                                <div className={styles.number}>15+ lat</div>
                                <div className={styles.label}>Doświadczenia</div>
                            </div>
                            <div className={styles.stat}>
                                <FontAwesomeIcon icon={faClock} className={styles.statIcon} />
                                <div className={styles.number}>10 min</div>
                                <div className={styles.label}>Test poziomujący</div>
                            </div>
                        </div>
                    </div>

                    {/* Szybka opinia */}
                    <div className="col-lg-4">
                        <div className={styles.quickTestimonial}>
                            <div className={styles.quoteIcon}>"</div>
                            <div className={styles.quote}>
                                Po lekcjach z Gosią wreszcie nie boję się mówić po angielsku!
                            </div>
                            <div className={styles.author}>- Magdalena G.</div>
                            <div className={styles.stars}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <Link href={routeMap[routeNames.TEST]}>
                                <a
                                    className={styles.testimonialCta}
                                    onClick={() => trackClick(events.HOME_SOCIAL_PROOF_CLICK_TEST)}
                                >
                                    Dołącz do zadowolonych →
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
