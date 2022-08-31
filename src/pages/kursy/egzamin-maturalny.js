import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../../components/PageHeader';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import { routeMap, routeNames } from '../../routes';
import CourseRequirements from '../../components/CourseRequirements';
import CourseDetails from '../../components/CourseDetails';
import courseGroupImage from '../../../public/images/course-group.jpg';
import styles from './Course.module.scss';

export default function CoursesMaturaExam() {
    const trackClick = useClickTracking();

    return (
        <>
            <PageHeader title="Egzamin maturalny" />

            <section className={styles.root}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="course-single-header">
                                <h2 className="single-course-title">Zajęcia grupowe z języka angielskiego</h2>
                                <p>
                                    Rezultatem kursu jest przygotowanie do egzaminu maturalnego na poziomie podstawowym
                                    lub rozszerzonym
                                </p>
                            </div>

                            <div className="single-course-details ">
                                <div className="course-widget course-info">
                                    <ul>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} />
                                            Lekcje raz w tygodniu
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faCheck} />
                                            Zajęcia trwają 90 min (2 lekcje)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="course-sidebar">
                                <div className="course-single-thumb">
                                    <Image
                                        src={courseGroupImage}
                                        alt="Grupa uczniów podczas lekcji angielskiego"
                                        placeholder="blur"
                                        layout="responsive"
                                        sizes="(min-width: 1200px) 318px, (min-width: 992px) 258px, (min-width: 768px) 658px, (min-width: 576px) 478px, calc(100vw - 62px)"
                                        quality="75"
                                    />
                                    <div className="course-price-wrapper">
                                        <div className="course-price ml-3">
                                            <h4>
                                                Cena: <span>945 zł</span>
                                            </h4>
                                        </div>
                                        <div className="buy-btn">
                                            <Link href={routeMap[routeNames.CONTACT]}>
                                                <a
                                                    className="btn btn-main btn-block"
                                                    onClick={() => trackClick(events.MATURA_EXAM_COURSE_CLICK_ENROLL)}
                                                >
                                                    Zapisz się
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <CourseDetails
                                    items={[
                                        {
                                            title: 'Czas:',
                                            content: '2 lekcje tygodniowo (90 min.)',
                                            icon: 'alarm-clock',
                                        },
                                        {
                                            title: 'Liczba lekcji:',
                                            content: '54 w ciągu roku',
                                            icon: 'refresh-time',
                                        },
                                        {
                                            title: 'Płatność:',
                                            content: 'za semestr z góry',
                                            icon: 'money-bag',
                                        },
                                        {
                                            title: 'Poziom:',
                                            content: 'podst. lub rozszerzony',
                                            icon: 'graph-bar',
                                        },
                                        {
                                            title: 'Gdzie:',
                                            content: 'Online',
                                            icon: 'location-pointer',
                                        },
                                    ]}
                                />

                                <CourseRequirements />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
