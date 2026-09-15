import { useRouter } from 'next/router';
import useClickTracking from '../hooks/useClickTracking';
import { events } from '../services/tracking';

export default function CourseRequirements() {
  const trackClick = useClickTracking();
  const { pathname } = useRouter();

  return (
    <div className="course-widget course-metarials">
      <h3 className="course-title">Wymagania</h3>
      <p>
        Do udziału w lekcji potrzebujesz komputera, kamerki (ewentualnie
        smartfona) dostępu do internetu oraz słuchawek z mikrofonem.
      </p>
      <p>
        Zajęcia online odbywają się poprzez platformę{' '}
        <a
          href="https://zoom.us/"
          onClick={() =>
            trackClick(
              events.COURSE_REQUIREMENTS_CLICK_PLATFORM('Zoom', pathname),
            )
          }
          target="_blank"
          rel="noreferrer nofollow"
        >
          Zoom
        </a>
        ,{' '}
        <a
          href="https://meet.google.com/"
          onClick={() =>
            trackClick(
              events.COURSE_REQUIREMENTS_CLICK_PLATFORM(
                'Google Meet',
                pathname,
              ),
            )
          }
          target="_blank"
          rel="noreferrer nofollow"
        >
          Google Meet
        </a>{' '}
        lub{' '}
        <a
          href="https://www.microsoft.com/microsoft-teams/"
          onClick={() =>
            trackClick(
              events.COURSE_REQUIREMENTS_CLICK_PLATFORM('Teams', pathname),
            )
          }
          target="_blank"
          rel="noreferrer nofollow"
        >
          Teams
        </a>
        .
      </p>
    </div>
  );
}
