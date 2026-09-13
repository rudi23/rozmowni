import { initializeAsync, sendEvent, sendPageView } from './googleAnalytics';
import * as allEvents from './events';
import * as allFacebookEvents from './facebookEvents';

const tracking = {
  initializeAsync,
  sendEvent,
  sendPageView,
  events: allEvents,
};

export const events = allEvents;
export const facebookEvents = allFacebookEvents;

export default tracking;
