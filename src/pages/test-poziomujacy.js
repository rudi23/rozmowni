import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TestIntroView from '../components/test/TestIntroView';
import TestRunner from '../components/test/TestRunner';
import TestResultsView from '../components/test/TestResultsView';

export default function TestPage() {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const resetTest = () => {
    setSelectedTest(null);
    setShowResults(false);
    setScore(0);
    // Scroll to top when resetting to intro
    window.scrollTo(0, 0);
  };

  // Reset test when navigating to the main test page
  useEffect(() => {
    // Only reset if we're on the main test page without query parameters
    if (Object.keys(router.query).length === 0) {
      resetTest();
    }
  }, [router.asPath, router.query]);

  const handleTestSelection = (testType) => {
    setSelectedTest(testType);
    setShowResults(false);
    setScore(0);
    // Scroll to top when starting test
    window.scrollTo(0, 0);
  };

  const handleTestComplete = (finalScore) => {
    setScore(finalScore);
    setShowResults(true);
    // Scroll to top when showing results
    window.scrollTo(0, 0);
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
