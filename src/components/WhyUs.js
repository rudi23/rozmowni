import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';
import { routeMap, routeNames } from '../routes';
import whyUsImage from '../../public/images/why-us.jpg';
import SectionHeading from './SectionHeading';
import Section from './Section';

export default function WhyUs() {
    const trackClick = useClickTracking();

    return (
        <Section background="gray">
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                    <div className="img-block">
                        <Image
                            src={whyUsImage}
                            alt="Małgorzata Rudowska przysłuchująca się uczniom podczas zajęć angielskiego"
                            placeholder="blur"
                            layout="responsive"
                            sizes="(min-width: 1200px) 540px, (min-width: 992px) 450px, (min-width: 768px) 690px, (min-width: 576px) 510px, calc(100vw-30px)"
                            quality="75"
                        />
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <SectionHeading heading="Czy do siebie pasujemy?" subheading="Dlaczego my?" />

                    <p>Nudzą Cię sztampowe tematy dyskusji typu "Czy lepiej mieszkać na wsi czy w mieście?"</p>
                    <p>Chcesz nie tylko uczyć się angielskiego, ale także rozwijać się w innych obszarach.</p>
                    <p>Ważne są dla Ciebie kompetencje przyszłości.</p>
                    <p>Masz dość szkolnych testów i ocen.</p>
                    <p>Dobrze trafiłeś!</p>

                    <Link href={routeMap[routeNames.WHY_US]}>
                        <a className="btn btn-main mt-4" onClick={() => trackClick(events.HOME_WHY_US_CLICK_CONTACT)}>
                            <FontAwesomeIcon icon={faCheck} className="mr-2" />
                            Sprawdź co nas wyróżnia
                        </a>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
