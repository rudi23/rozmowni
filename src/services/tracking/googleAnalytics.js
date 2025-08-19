const TRACKING_ID = 'G-2XD6SZL2GR';

const isDev = process.env.NODE_ENV === 'development';

export function initializeAsync() {
  return import('react-ga4').then((x) => x.default);
}

export function sendEvent(ReactGA, eventData) {
  if (!isDev) {
    ReactGA.initialize(TRACKING_ID, {
      gtagOptions: {
        send_page_view: false,
      },
    });
    ReactGA.event(eventData);
  } else {
    console.log('GA: initialize (click)');
    console.log('GA: send event', eventData);
  }
}

export function sendPageView(ReactGA, routePathname) {
  if (!isDev) {
    ReactGA.initialize(TRACKING_ID, {
      gtagOptions: {
        send_page_view: false,
      },
    });
    ReactGA.send({ hitType: 'pageview', page: routePathname });
  } else {
    console.log('GA: initialize (page view)');
    console.log(`GA: send page view: ${routePathname}`);
  }
}
