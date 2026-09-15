import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TestIntroView from '../components/test/TestIntroView';
import TestRunner from '../components/test/TestRunner';
import TestResultsView from '../components/test/TestResultsView';
import { testData, getLevel } from '../data/testData';
import useFacebookEventTracking from '../hooks/useFacebookEventTracking';
import useClickTracking from '../hooks/useClickTracking';
import { events, facebookEvents } from '../services/tracking';

export default function TestPage() {
  const router = useRouter();
  const trackFacebookEvent = useFacebookEventTracking();
  const trackClick = useClickTracking();
  const [selectedTest, setSelectedTest] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const resetTest = () => {
    setSelectedTest(null);
    setShowResults(false);
    setScore(0);
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
    // Start of the funnel: the user picked a test type, not just landed here
    trackClick(events.TEST_START(testType));
  };

  const handleTestComplete = (finalScore) => {
    setScore(finalScore);
    setShowResults(true);
    // Both fire once per completed test, at the transition to the results screen
    trackClick(
      events.TEST_COMPLETED(
        selectedTest,
        finalScore,
        testData[selectedTest].questions.length,
        getLevel(finalScore, selectedTest)?.level,
      ),
    );
    trackFacebookEvent(facebookEvents.TEST_COMPLETED_LEAD(selectedTest));
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
