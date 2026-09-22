const PROJECT_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const API_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const isDev = process.env.NODE_ENV === 'development';

// Both variables are inlined at build time. Without them PostHog stays off
// completely instead of throwing, so a missing configuration degrades to "no
// analytics" rather than a broken page or a failing API route.
const isConfigured = Boolean(PROJECT_TOKEN && API_HOST);

// GA4 models an event as category/action/label; PostHog models it as a name
// plus properties. Funnel-critical events carry an explicit `posthogEvent` in
// events.js - every other click lands under this name and stays queryable
// through its properties, so nothing is silently dropped on the PostHog side.
const DEFAULT_EVENT_NAME = 'link_clicked';

// The site's own code is served over http(s); anything on another URI scheme -
// iabjs:// from the Facebook in-app browser, chrome-extension:// from an
// extension - is script injected into the page, not code we shipped.
function isNonAppSchemeFrame(frame) {
  const filename = frame && frame.filename;

  if (typeof filename !== 'string') {
    return false;
  }

  const scheme = filename.match(/^([a-z][a-z0-9+.-]*):/i);

  return (
    Boolean(scheme) && !['http', 'https'].includes(scheme[1].toLowerCase())
  );
}

// `capture_exceptions` reports every unhandled error on the page, so an injected
// script that throws on its way out (the in-app browser losing its Java binding)
// opens an issue as if it were ours. Such an exception has frames and every one
// of them loads from a non-app scheme; a genuine site error always keeps at
// least one http(s) frame, so it is never matched.
function isInjectedScriptException(properties) {
  const exceptions = properties && properties.$exception_list;

  if (!Array.isArray(exceptions)) {
    return false;
  }

  const frames = exceptions.flatMap(
    (exception) =>
      (exception && exception.stacktrace && exception.stacktrace.frames) || [],
  );

  return frames.length > 0 && frames.every(isNonAppSchemeFrame);
}

// window.onerror reports a cross-origin script failure with the fixed, opaque
// value "Script error." (some browsers drop the period). The browser withholds
// the message, file, and line on purpose, so this value can never point at site
// code.
function isScriptErrorValue(value) {
  return (
    typeof value === 'string' &&
    value.trim().replace(/\.$/, '') === 'Script error'
  );
}

// A cross-origin script failure reaches posthog-js as a synthetic exception with
// the opaque "Script error." value and no stack frames, and `capture_exceptions`
// reports it because the error went unhandled. The frameless case slips past
// isInjectedScriptException, which needs at least one frame; a genuine site error
// carries a real message or frames, so this test never matches one.
function isOpaqueCrossOriginException(properties) {
  const exceptions = properties && properties.$exception_list;

  if (!Array.isArray(exceptions)) {
    return false;
  }

  return exceptions.some((exception) => {
    const frames =
      (exception && exception.stacktrace && exception.stacktrace.frames) || [];

    return (
      exception &&
      exception.mechanism &&
      exception.mechanism.synthetic === true &&
      isScriptErrorValue(exception.value) &&
      frames.length === 0
    );
  });
}

let clientPromise = null;

// posthog-js is ~90 kB gzipped - an order of magnitude more than react-ga4 or
// react-facebook-pixel - so it is imported lazily for the same reason they are.
// Unlike them it is initialized exactly once: posthog.init() is not idempotent
// the way ReactGA.initialize() and ReactPixel.init() are.
function initializeAsync() {
  if (isDev || !isConfigured) {
    return Promise.resolve(null);
  }

  if (!clientPromise) {
    clientPromise = import('posthog-js')
      .then(({ default: posthog }) => {
        posthog.init(PROJECT_TOKEN, {
          api_host: API_HOST,
          defaults: '2026-01-30',
          capture_exceptions: true,
          // Drop third-party exception noise before it leaves the browser, so
          // it never opens an error-tracking issue: scripts injected into the
          // page (Facebook in-app browser, extensions) and the opaque
          // cross-origin "Script error." the browser reports without any detail.
          before_send: (event) => {
            if (event && event.event === '$exception') {
              const { properties } = event;

              if (
                isInjectedScriptException(properties) ||
                isOpaqueCrossOriginException(properties)
              ) {
                return null;
              }
            }

            return event;
          },
          session_recording: {
            // Every input on this site collects a lead's personal data - name,
            // email, phone. Session replay records the screen, so the typed
            // values must be masked before the recording leaves the browser.
            maskAllInputs: true,
          },
        });

        return posthog;
      })
      // A blocked or failed chunk just means no PostHog. It must never break
      // the page, and least of all the form submit it is attached to.
      .catch(() => null);
  }

  return clientPromise;
}

function sendEvent(
  posthog,
  { category, action, label, posthogEvent, posthogProperties },
) {
  const properties = {
    source_category: category,
    source_action: action,
    source_label: label,
    // Domain properties from the event constant. The `source_` prefix is
    // reserved for the fields mapped over from the GA4 model, so a constant can
    // never collide with them.
    ...posthogProperties,
  };

  if (isDev) {
    console.log(
      `PostHog: send event: ${posthogEvent || DEFAULT_EVENT_NAME}`,
      properties,
    );

    return;
  }

  posthog?.capture(posthogEvent || DEFAULT_EVENT_NAME, properties);
}

// Self-contained, unlike sendEvent: the callers are components reporting a
// caught error, and they should not have to hold a PostHog instance to do it.
// `capture_exceptions` only covers errors that go unhandled.
async function sendExceptionAsync(error) {
  if (isDev) {
    console.log('PostHog: send exception', error);

    return;
  }

  try {
    const posthog = await initializeAsync();

    posthog?.captureException(error);
  } catch {
    // Callers fire this and move on, so a rejection here would surface as an
    // unhandled one. Failing to report an error is not worth raising another.
  }
}

// Lets an API route attach its server-side event to the same person and session
// the browser is recording, without the page having to know how PostHog
// identifies either. Resolves to {} whenever PostHog is off, so the caller can
// spread it unconditionally.
async function getRequestHeadersAsync() {
  const posthog = await initializeAsync();

  if (!posthog) {
    return {};
  }

  try {
    // Both getters can return undefined before the client has settled; an
    // undefined header value would be sent as the literal string "undefined".
    const headers = {
      'X-PostHog-Distinct-ID': posthog.get_distinct_id(),
      'X-PostHog-Session-ID': posthog.get_session_id(),
    };

    return Object.fromEntries(
      Object.entries(headers).filter(([, value]) => Boolean(value)),
    );
  } catch {
    // This runs inside the form submit. Losing the session link is acceptable;
    // failing the submit over it is not.
    return {};
  }
}

export {
  initializeAsync,
  sendEvent,
  sendExceptionAsync,
  getRequestHeadersAsync,
};
