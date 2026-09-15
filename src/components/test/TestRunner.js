import { useState, useEffect, useRef } from 'react';
import useClickTracking from '../../hooks/useClickTracking';
import { events } from '../../services/tracking';
import PageHeader from '../PageHeader';
import Section from '../Section';
import { testData } from '../../data/testData';
import styles from './TestRunner.module.scss';

const TestRunner = ({ selectedTest, onTestComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const trackClick = useClickTracking();
  // Highest question already reported to GA. Going back and forward again must
  // not report a question twice, or the drop-off curve stops being monotonic.
  const furthestQuestionRef = useRef(0);

  const totalQuestions = testData[selectedTest].questions.length;

  // On a phone the navigation is a bar fixed to the bottom of the screen, so
  // the document needs room under it or it covers the end of the footer.
  useEffect(() => {
    document.body.classList.add('has-fixed-test-nav');

    return () => document.body.classList.remove('has-fixed-test-nav');
  }, []);

  // Reported on display, before the user answers: the last event a visitor
  // sends is then literally the last question they saw, which is where they
  // gave up.
  useEffect(() => {
    const questionNumber = currentQuestion + 1;

    if (questionNumber <= furthestQuestionRef.current) {
      return;
    }

    furthestQuestionRef.current = questionNumber;
    trackClick(
      events.TEST_PROGRESS(selectedTest, questionNumber, totalQuestions),
    );
  }, [currentQuestion, selectedTest, totalQuestions, trackClick]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    // Update the answers array at the current question index
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
        // Set selectedAnswer to the answer for the next question if it exists
        setSelectedAnswer(
          answers[currentQuestion + 1] !== undefined
            ? answers[currentQuestion + 1]
            : null,
        );
      } else {
        // Calculate final score using the answers array
        const finalScore = answers.reduce((acc, answer, index) => {
          return (
            acc +
            (answer !== undefined &&
            answer === testData[selectedTest].questions[index].correct
              ? 1
              : 0)
          );
        }, 0);
        onTestComplete(finalScore);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Set selectedAnswer to the answer for the previous question if it exists
      setSelectedAnswer(
        answers[currentQuestion - 1] !== undefined
          ? answers[currentQuestion - 1]
          : null,
      );
    }
  };

  const currentQuestionData = testData[selectedTest].questions[currentQuestion];
  // Calculate progress based on number of answered questions
  const answeredCount = answers.filter((answer) => answer !== undefined).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <>
      <PageHeader title={testData[selectedTest].title} />
      <Section>
        <div className={styles.testContainer}>
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.progressInfo}>
              Pytanie {currentQuestion + 1} z {totalQuestions}
            </p>
          </div>

          <div className={styles.questionContainer}>
            <h2 className={styles.questionText}>
              {currentQuestionData.question}
            </h2>

            <div className={styles.answersContainer}>
              {currentQuestionData.options.map((option, index) => (
                <button
                  type="button"
                  key={index}
                  className={`${styles.answerOption} ${
                    selectedAnswer === index ? styles.selected : ''
                  }`}
                  aria-pressed={selectedAnswer === index}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <span className={styles.answerLetter} aria-hidden="true">
                    {String.fromCharCode(97 + index)}
                  </span>
                  <span className={styles.answerText}>{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.navigationButtons}>
            {currentQuestion > 0 && (
              <button
                type="button"
                className={styles.prevButton}
                onClick={handlePreviousQuestion}
              >
                Wstecz
              </button>
            )}

            <button
              type="button"
              className={`${styles.nextButton} ${selectedAnswer === null ? styles.disabled : ''}`}
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {currentQuestion === totalQuestions - 1
                ? 'Zakończ test'
                : 'Następne'}
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default TestRunner;
