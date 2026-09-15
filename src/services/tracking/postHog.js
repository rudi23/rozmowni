// PostHog product analytics. Mirrors the GA4 and Pixel services: the library is
// lazy-imported and the project key is hardcoded, so staging and production
// report into the same PostHog project (same reasoning as the other analytics
// IDs, see CLAUDE.md). The key is a public, client-side project token.
const PROJECT_TOKEN = 'phc_o3mGYJXuiM3KXXY52BZYiy96bMqWnhErSwt4t36RHVsj';
const API_HOST = 'https://eu.i.posthog.com';
const UI_HOST = 'https://eu.posthog.com';

const isDev = process.env.NODE_ENV === 'development';

let initialized = false;

function ensureInitialized(posthog) {
  if (initialized) {
    return;
  }

  posthog.init(PROJECT_TOKEN, {
    api_host: API_HOST,
    ui_host: UI_HOST,
    defaults: '2026-01-30',
    // Page views are sent manually on route change (see usePostHogTracking),
    // matching how GA4 and the Pixel report navigations in this app.
    capture_pageview: false,
    capture_exceptions: true,
  });
  initialized = true;
}

export function initializeAsync() {
  return import('posthog-js').then((x) => x.default);
}

export function sendPageView(posthog, routePathname) {
  if (!isDev) {
    ensureInitialized(posthog);
    posthog.capture('$pageview');
  } else {
    console.log('PostHog: initialize');
    console.log(`PostHog: send page view: ${routePathname}`);
  }
}
