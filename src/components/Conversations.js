import Image from 'next/image';
import conversationsImage from '../../public/images/conversations.jpg';
import SectionHeading from './SectionHeading';
import Section from './Section';
import Accordion from './Accordion';
import styles from './Conversations.module.scss';
import ResponsiveImage from './ResponsiveImage';

export default function Conversations() {
    return (
        <Section id="conversations">
            <div className="row">
                <div className="col-12">
                    <div className={styles.textWithFloatingImage}>
                        <SectionHeading heading="Konwersacje" subheading="Jak uczymy?" />

                        <div className={styles.floatingImage}>
                            <ResponsiveImage
                                src={conversationsImage}
                                alt="Konwersacje w grupie"
                                placeholder="blur"
                                sizes="(min-width: 1200px) 350px, (min-width: 992px) 300px, (min-width: 768px) 250px, calc(100vw-30px)"
                                quality="75"
                            />
                        </div>

                        <p>
                            Specjalizujemy się w nauczaniu angielskiego praktycznego, z dużym naciskiem na ćwiczenie
                            konwersacji. Na zajęciach korzystamy nie tylko z podręczników, ale także oglądamy ciekawe
                            filmiki i gramy w gry po angielsku, ćwiczymy nowe słownictwo, przydatne zwroty oraz
                            zagadnienia gramatyczne. Od pierwszych zajęć staramy się aby uczniowie jak najwięcej mówili
                            po angielsku.
                        </p>

                        <p>Tematy konwersacji są dobrane do poziomu, wieku oraz zainteresowań uczniów.</p>

                        <p>
                            Aby dać Ci lepsze pojęcie o tym, jak wyglądają nasze zajęcia, przedstawiamy przykładowe
                            tematy, które omawiamy w zależności od poziomu zaawansowania:
                        </p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h3 className="mb-4">Tematy konwersacji</h3>

                    <div className={styles.conversationCards}>
                        <div className={styles.conversationCard}>
                            <div className={styles.cardHeader}>
                                <span className={`${styles.levelBadge} ${styles.levelBasic}`}>🟢</span>
                                <h5 className={styles.cardTitle}>Poziom podstawowy</h5>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.topicItem}>Poznawanie nowych osób</div>
                                <div className={styles.topicItem}>Sytuacje na lotnisku i w hotelu</div>
                                <div className={styles.topicItem}>Zamawianie jedzenia w restauracji</div>
                                <div className={styles.topicItem}>Wizyta u lekarza</div>
                            </div>
                        </div>

                        <div className={styles.conversationCard}>
                            <div className={styles.cardHeader}>
                                <span className={`${styles.levelBadge} ${styles.levelIntermediate}`}>🟡</span>
                                <h5 className={styles.cardTitle}>Poziom średnio zaawansowany</h5>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.topicItem}>Wpływ social media na życie</div>
                                <div className={styles.topicItem}>Edukacja jako broń</div>
                                <div className={styles.topicItem}>Stereotypy krajów</div>
                                <div className={styles.topicItem}>Katastrofy nuklearne</div>
                            </div>
                        </div>

                        <div className={styles.conversationCard}>
                            <div className={styles.cardHeader}>
                                <span className={`${styles.levelBadge} ${styles.levelAdvanced}`}>🔴</span>
                                <h5 className={styles.cardTitle}>Poziom zaawansowany</h5>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.topicItem}>TED talks i dyskusje</div>
                                <div className={styles.topicItem}>Filozofia dobrego życia</div>
                                <div className={styles.topicItem}>Testy osobowości</div>
                                <div className={styles.topicItem}>Prywatność vs monitoring</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
