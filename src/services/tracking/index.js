import { initializeAsync, sendEvent, sendPageView } from './googleAnalytics';
import * as allEvents from './events';

const tracking = {
  initializeAsync,
  sendEvent,
  sendPageView,
  events: allEvents,
};

export const events = allEvents;

export default tracking;
