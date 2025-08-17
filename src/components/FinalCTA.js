import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRocket,
    faClock,
    faCheck,
    faUsers,
    faExclamationTriangle,
    faLock,
    faChartBar,
    faBullseye,
    faGem,
    faBook,
    faEnvelope,
    faGift,
} from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import styles from './FinalCTA.module.scss';

export default function FinalCTA() {
    const trackClick = useClickTracking();

    return (
        <section className={styles.finalCTA}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 text-center">
                        {/* Social Proof */}
                        <div className={styles.socialProof}>
                            <FontAwesomeIcon icon={faUsers} className={styles.socialIcon} />
                            <span>Ponad 100 osób już sprawdziło swój poziom!</span>
                        </div>

                        {/* Main Headline */}
                        <h2 className={styles.mainHeading}>
                            Nie czekaj - sprawdź swój poziom <span className={styles.highlight}>TERAZ!</span>
                        </h2>

                        <p className={styles.subtitle}>
                            Dołącz do grona zadowolonych uczniów i odkryj swoją ścieżkę do płynnego angielskiego!
                        </p>

                        {/* Benefits Grid */}
                        <div className={styles.finalBenefits}>
                            <div className={styles.benefitRow}>
                                <div className={styles.finalBenefit}>
                                    <FontAwesomeIcon icon={faClock} />
                                    <span>Test: 10 minut</span>
                                </div>
                                <div className={styles.finalBenefit}>
                                    <FontAwesomeIcon icon={faChartBar} />
                                    <span>Wynik: natychmiast</span>
                                </div>
                            </div>
                            <div className={styles.benefitRow}>
                                <div className={styles.finalBenefit}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>Zaproszenie na lekcję próbną: do 24h</span>
                                </div>
                                <div className={styles.finalBenefit}>
                                    <FontAwesomeIcon icon={faGift} />
                                    <span>E-book: darmowy</span>
                                </div>
                            </div>
                        </div>

                        {/* Value Proposition */}
                        <div className={styles.valueBox}>
                            <h3 className={styles.valueTitle}>Co otrzymujesz w pakiecie startowym:</h3>
                            <div className={styles.valueGrid}>
                                <div className={styles.valueRow}>
                                    <div className={styles.valueItem}>
                                        <FontAwesomeIcon icon={faChartBar} className={styles.valueIcon} />
                                        Test poziomujący z języka angielskiego
                                        <br />
                                        <span>wartość: 50 zł</span>
                                    </div>
                                    <div className={styles.valueItem}>
                                        <FontAwesomeIcon icon={faEnvelope} className={styles.valueIcon} />
                                        Zaproszenie na bezpłatną lekcję próbną
                                        <br />
                                        <span>wartość: 100 zł</span>
                                    </div>
                                </div>
                                <div className={styles.valueRow}>
                                    <div className={styles.valueItem}>
                                        <FontAwesomeIcon icon={faGem} className={styles.valueIcon} />
                                        Spersonalizowany plan po lekcji próbnej
                                        <br />
                                        <span>wartość: 100 zł</span>
                                    </div>
                                    <div className={styles.valueItem}>
                                        <FontAwesomeIcon icon={faBook} className={styles.valueIcon} />
                                        E-book "Czas na angielski"
                                        <br />
                                        <span>wartość: 100 zł</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.totalValue}>
                                Łączna wartość: <span className={styles.oldPrice}>350 zł</span>
                                <span className={styles.newPrice}>GRATIS!</span>
                            </div>
                        </div>

                        {/* Main CTA */}
                        <div className={styles.ctaSection}>
                            <Link href={routeMap[routeNames.TEST]}>
                                <a
                                    className={styles.finalButton}
                                    onClick={() => trackClick(events.HOME_FINAL_CTA_CLICK_TEST)}
                                >
                                    <FontAwesomeIcon icon={faRocket} className="mr-2" />
                                    ZRÓB BEZPŁATNY TEST - OSTATNIA SZANSA!
                                </a>
                            </Link>

                            <div className={styles.countdown}>
                                <p>
                                    <strong>⏰ Nie zwlekaj!</strong> Im szybciej sprawdzisz poziom, tym szybciej
                                    zaczniesz mówić płynnie po angielsku!
                                </p>
                            </div>
                        </div>

                        {/* Guarantee */}
                        <div className={styles.guarantee}>
                            <FontAwesomeIcon icon={faLock} className={styles.lockIcon} />
                            <div className={styles.guaranteeText}>
                                <strong>Gwarancja 100% bezpieczeństwa:</strong>
                                <br />
                                <small>
                                    ✓ Żadnego spamu ✓ Pełna dyskrecja ✓ Możliwość wypisania się w każdej chwili
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
