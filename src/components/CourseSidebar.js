import Link from 'next/link';
import useClickTracking from '../hooks/useClickTracking';
import { routeMap, routeNames } from '../routes';
import CourseRequirements from './CourseRequirements';
import CourseDetails from './CourseDetails';
import ResponsiveImage from './ResponsiveImage';

export default function CourseSidebar({
    image,
    imageAlt,
    price,
    enrollEvent,
    courseDetails,
    showRequirements = true,
    className = '',
    thumbClassName = '',
}) {
    const trackClick = useClickTracking();

    return (
        <div className={`course-sidebar ${className}`}>
            <div className={`course-single-thumb ${thumbClassName}`}>
                <ResponsiveImage
                    src={image}
                    alt={imageAlt}
                    placeholder="blur"
                    sizes="(min-width: 1200px) 318px, (min-width: 992px) 258px, (min-width: 768px) 658px, (min-width: 576px) 478px, calc(100vw - 62px)"
                    quality="75"
                />
                <div className="course-price-wrapper">
                    <div className="course-price ms-3">
                        <h4>
                            Cena: <span>{price}</span>
                        </h4>
                    </div>
                    <div className="buy-btn">
                        <Link
                            href={routeMap[routeNames.CONTACT]}
                            className="btn btn-main w-100"
                            onClick={() => trackClick(enrollEvent)}
                        >
                            Zapisz się
                        </Link>
                    </div>
                </div>
            </div>
            <CourseDetails items={courseDetails} />
            {showRequirements && <CourseRequirements />}
        </div>
    );
}
