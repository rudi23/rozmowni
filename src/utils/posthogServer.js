import { PostHog } from 'posthog-node';

const PROJECT_TOKEN = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const API_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const isDev = process.env.NODE_ENV === 'development';
const isConfigured = Boolean(PROJECT_TOKEN && API_HOST);

let client = null;

// Returns null whenever PostHog is off, so every caller degrades to "no
// analytics". It must never throw: these helpers run inside the lead funnel,
// after the emails have already gone out.
function getClient() {
  if (isDev || !isConfigured) {
    return null;
  }

  if (!client) {
    client = new PostHog(PROJECT_TOKEN, {
      host: API_HOST,
      // Passenger keeps the process alive between requests, so posthog-node can
      // own the delivery: send each event straight away and let it retry in the
      // background instead of the handler awaiting a flush.
      flushAt: 1,
      flushInterval: 0,
    });
    // An unreachable PostHog must not surface as an unhandled 'error' event and
    // take the whole node process down with it.
    client.on('error', () => {});
  }

  return client;
}

// Deliberately fire-and-forget. By the time these run the lead already has its
// email, so a slow or unreachable PostHog must never delay the response, and
// must never turn a delivered lead into a 500.
function captureEvent({ distinctId, sessionId, event, properties }) {
  if (isDev) {
    console.log(`PostHog (server): send event: ${event}`, properties);

    return;
  }

  try {
    getClient()?.capture({
      distinctId,
      event,
      properties: { ...properties, $session_id: sessionId, source: 'api' },
    });
  } catch {
    // An analytics failure is not worth failing the request over.
  }
}

function captureException(error, { distinctId, sessionId }) {
  if (isDev) {
    console.log('PostHog (server): send exception', error);

    return;
  }

  try {
    getClient()?.captureException(error, distinctId, {
      $session_id: sessionId,
    });
  } catch {
    // Same reason: the handler is already on its error path.
  }
}

export { captureEvent, captureException };
