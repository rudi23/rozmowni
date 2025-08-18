import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faBullseye, faGem, faBook, faRocket, faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import Section from './Section';
import SectionHeading from './SectionHeading';
import styles from './TestBenefits.module.scss';

export default function TestBenefits() {
    const trackClick = useClickTracking();

    return (
        <Section>
            <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                    <SectionHeading heading="Co zyskujesz robiąc BEZPŁATNY test?" subheading="Więcej niż myślisz!" />
                    <p className={styles.intro}>
                        Nasz test to nie tylko sprawdzenie poziomu - to kompletny pakiet startowy do Twojej przygody z
                        angielskim
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-6 mb-4">
                    <div className={styles.benefit}>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faChartBar} />
                        </div>
                        <h4>Wynik testu</h4>
                        <p>Natychmiastowe określenie Twojego poziomu językowego (A1-C2) po zakończeniu testu</p>
                        <div className={styles.value}>Wartość: 50 zł</div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 mb-4">
                    <div className={styles.benefit}>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faGem} />
                        </div>
                        <h4>Bezpłatna lekcja próbna</h4>
                        <p>30-minutowa indywidualna lekcja on-line z doświadczonym lektorem</p>
                        <div className={styles.value}>Wartość: 100 zł</div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6 mb-md-0 mb-4">
                    <div className={styles.benefit}>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faBullseye} />
                        </div>
                        <h4>Spersonalizowany plan</h4>
                        <p>
                            Indywidualna ścieżka rozwoju przygotowana podczas lekcji próbnej, dopasowana do Twojego
                            poziomu i celów
                        </p>
                        <div className={styles.value}>Wartość: 100 zł</div>
                    </div>
                </div>

                <div className="col-lg-6 col-md-6">
                    <div className={`${styles.benefit} ${styles.highlighted}`}>
                        <div className={styles.icon}>
                            <FontAwesomeIcon icon={faBook} />
                        </div>
                        <h4>BONUS: Bezpłatny e-book</h4>
                        <p>
                            "Czas na angielski" - 12-stronicowy przewodnik po wszystkich czasach angielskich
                            (podstawowe, potrzebne i mistrzowskie) z przykładami
                        </p>
                        <div className={styles.value}>Wartość: 100 zł</div>
                        <div className={styles.badge}>GRATIS!</div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className={styles.urgencyBox}>
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <h4>
                                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                                    To wszystko otrzymasz NATYCHMIAST po teście!
                                </h4>
                                <p className="mb-2">Wystarczy 10 minut Twojego czasu</p>
                                <p className="mb-2">
                                    Łączna wartość: <strong>350 zł</strong>
                                </p>
                                <p className="mb-4 mb-lg-0">
                                    Dla Ciebie: <strong className={styles.freeText}>GRATIS</strong>
                                </p>
                            </div>
                            <div className="col-lg-4 text-center">
                                <Link
                                    href={routeMap[routeNames.TEST]}
                                    className={`btn btn-main ${styles.mainCta}`}
                                    onClick={() => trackClick(events.HOME_TEST_BENEFITS_CLICK_TEST)}
                                >
                                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                                    ZRÓB TEST TERAZ
                                </Link>
                                <div className={styles.guarantee}>
                                    <small>🔒 100% darmowy • Bez zobowiązań</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
