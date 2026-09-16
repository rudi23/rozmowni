import { createAuthHeaders } from '../../utils/apiAuth';
import { getBrowserIds } from './facebookPixel';

const isDev = process.env.NODE_ENV === 'development';

// The server-side twin of the `CompleteRegistration` the pixel fires on the
// results screen. Sent under the same event id, so Meta keeps one conversion
// whether it receives one copy or both - and still receives one when an
// adblocker, ITP or a refused cookie banner stops the browser copy from leaving.
async function sendTestCompletedAsync({ eventId, testType }) {
  if (isDev) {
    console.log('FB CAPI: send event: CompleteRegistration', {
      eventId,
      testType,
    });

    return;
  }

  try {
    await fetch('/api/track-test-completed', {
      method: 'POST',
      headers: createAuthHeaders(),
      // The results screen is where people leave: without this the browser is
      // free to cancel the request the moment the tab closes, losing exactly
      // the conversions this endpoint exists to preserve.
      keepalive: true,
      body: JSON.stringify({
        eventId,
        testType,
        eventSourceUrl: window.location.href,
        ...getBrowserIds(),
      }),
    });
  } catch {
    // Reporting a conversion must never surface on the results screen.
  }
}

export { sendTestCompletedAsync };
