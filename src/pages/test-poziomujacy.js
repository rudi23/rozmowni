import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import TestIntroView from '../components/test/TestIntroView';
import TestRunner from '../components/test/TestRunner';
import TestResultsView from '../components/test/TestResultsView';
import { testData, getLevel } from '../data/testData';
import useFacebookEventTracking from '../hooks/useFacebookEventTracking';
import useClickTracking from '../hooks/useClickTracking';
import { events, facebookEvents } from '../services/tracking';
import { sendTestCompletedAsync } from '../services/tracking/facebookServerEvents';

export default function TestPage() {
  const router = useRouter();
  const trackFacebookEvent = useFacebookEventTracking();
  const trackClick = useClickTracking();
  const [selectedTest, setSelectedTest] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  // Set when the funnel starts, read when it finishes. A ref rather than state:
  // it must not trigger a render, and a refresh restarts the test anyway.
  const testStartedAtRef = useRef(null);

  const resetTest = () => {
    setSelectedTest(null);
    setShowResults(false);
    setScore(0);
    testStartedAtRef.current = null;
  };

  // Reset test when navigating to the main test page
  useEffect(() => {
    // Only reset if we're on the main test page without query parameters
    if (Object.keys(router.query).length === 0) {
      resetTest();
    }
  }, [router.asPath, router.query]);

  // Reset the scroll position after the new view has rendered, not inside the
  // click handler. Scrolling while the previous, much taller view is still laid
  // out lets the browser re-apply a stale offset once the shorter view mounts,
  // which on mobile leaves the user looking at the footer.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedTest, showResults]);

  const handleTestSelection = (testType) => {
    setSelectedTest(testType);
    setShowResults(false);
    setScore(0);
    testStartedAtRef.current = Date.now();
    // Start of the funnel: the user picked a test type, not just landed here
    trackClick(events.TEST_START(testType));
  };

  const handleTestComplete = (finalScore) => {
    setScore(finalScore);
    setShowResults(true);

    const startedAt = testStartedAtRef.current;

    // Both fire once per completed test, at the transition to the results screen
    trackClick(
      events.TEST_COMPLETED(
        selectedTest,
        finalScore,
        testData[selectedTest].questions.length,
        getLevel(finalScore, selectedTest)?.level,
        startedAt === null
          ? undefined
          : Math.round((Date.now() - startedAt) / 1000),
      ),
    );
    // Reported twice on purpose - once from the browser, once from the server -
    // under one id, so Meta keeps a single conversion but still sees it when the
    // pixel is blocked. This is the upper-funnel step: the campaign optimises
    // against `Lead`, which fires on the contact form in TestResultsView.
    const facebookEventId = trackFacebookEvent(
      facebookEvents.TEST_COMPLETED(selectedTest),
    );

    sendTestCompletedAsync({
      eventId: facebookEventId,
      testType: selectedTest,
    });
  };

  // Show intro screen when no test is selected
  if (!selectedTest) {
    return <TestIntroView onTestSelection={handleTestSelection} />;
  }

  // Show results screen after test completion
  if (showResults) {
    return (
      <TestResultsView
        score={score}
        selectedTest={selectedTest}
        onResetTest={resetTest}
      />
    );
  }

  // Show test runner during the test
  return (
    <TestRunner
      selectedTest={selectedTest}
      onTestComplete={handleTestComplete}
    />
  );
}
