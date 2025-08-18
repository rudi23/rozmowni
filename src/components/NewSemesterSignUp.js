import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import welcomeImage from '../../public/images/welcome.jpg';
import SectionHeading from './SectionHeading';
import Section from './Section';
import ResponsiveImage from './ResponsiveImage';

export default function WhyUs() {
    const trackClick = useClickTracking();

    return (
        <Section>
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                    <div className="img-block">
                        <ResponsiveImage
                            src={welcomeImage}
                            alt="Napis na tablicy: Witamy na lekcji języka angielskiego"
                            placeholder="blur"
                            sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                            quality="75"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <SectionHeading heading="Język angielski" subheading="Zapisy na rok szkolny 2025/2026" />

                    <p>Ruszyły zapisy na kursy językowe na rok szkolny 2025/2026!</p>
                    <p>
                        Już teraz zarezerwuj swoje miejsce na najbardziej rozgadanym kursie języka angielskiego online.
                    </p>
                    <p>
                        W rozmowni.pl nie tylko uczysz się angielskiego – rozwijasz kompetencje przyszłości przez
                        fascynujące konwersacje o rozwoju osobistym, psychologii i tematach, które naprawdę mają
                        znaczenie.
                    </p>

                    <p>Kursy prowadzimy online na wszystkich poziomach zaawansowania.</p>
                    <p>
                        Sprawdź poniżej, jak określić swój poziom, poznać nasze unikalne podejście do nauki i otrzymać
                        bezpłatną lekcję próbną.
                    </p>
                    <p>Dołącz do nas i odkryj, jak angielski może stać się narzędziem Twojego osobistego rozwoju.</p>

                    <Link
                        href={routeMap[routeNames.TEST]}
                        className="btn btn-main mt-4"
                        onClick={() => trackClick(events.HOME_WHY_US_CLICK_CONTACT)}
                    >
                        <FontAwesomeIcon icon={faCheck} className="me-2" />
                        Zrób test i dowiedz się, czy jesteś gotowy(a) do egzaminu!
                    </Link>
                </div>
            </div>
        </Section>
    );
}
