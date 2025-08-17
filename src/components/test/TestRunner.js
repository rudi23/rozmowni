import { useState } from 'react';
import PageHeader from '../PageHeader';
import Section from '../Section';
import { testData } from '../../data/testData';
import styles from './TestRunner.module.scss';

const TestRunner = ({ selectedTest, onTestComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerSelect = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        // Update the answers array at the current question index
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (selectedAnswer !== null) {
            if (currentQuestion < testData[selectedTest].questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                // Set selectedAnswer to the answer for the next question if it exists
                setSelectedAnswer(answers[currentQuestion + 1] !== undefined ? answers[currentQuestion + 1] : null);
            } else {
                // Calculate final score using the answers array
                const finalScore = answers.reduce((acc, answer, index) => {
                    return (
                        acc +
                        (answer !== undefined && answer === testData[selectedTest].questions[index].correct ? 1 : 0)
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
            setSelectedAnswer(answers[currentQuestion - 1] !== undefined ? answers[currentQuestion - 1] : null);
        }
    };

    const currentQuestionData = testData[selectedTest].questions[currentQuestion];
    // Calculate progress based on number of answered questions
    const answeredCount = answers.filter((answer) => answer !== undefined).length;
    const progress = (answeredCount / testData[selectedTest].questions.length) * 100;

    return (
        <>
            <PageHeader title={testData[selectedTest].title} />
            <Section>
                <div className={styles.testContainer}>
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                        </div>
                        <div className={styles.progressInfo}>
                            <span className={styles.progressText}>
                                {answeredCount} z {testData[selectedTest].questions.length} odpowiedzi
                            </span>
                            <span className={styles.questionNumber}>
                                Pytanie {currentQuestion + 1}/{testData[selectedTest].questions.length}
                            </span>
                        </div>
                    </div>

                    <div className={styles.questionContainer}>
                        <h3 className={styles.questionText}>
                            {currentQuestion + 1}. {currentQuestionData.question}
                        </h3>

                        <div className={styles.answersContainer}>
                            {currentQuestionData.options.map((option, index) => (
                                <div
                                    key={index}
                                    className={`${styles.answerOption} ${
                                        selectedAnswer === index ? styles.selected : ''
                                    }`}
                                    onClick={() => handleAnswerSelect(index)}
                                >
                                    <span className={styles.answerLetter}>{String.fromCharCode(97 + index)})</span>
                                    <span className={styles.answerText}>{option}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.navigationButtons}>
                        <div className={styles.leftButton}>
                            {currentQuestion > 0 && (
                                <button className={styles.prevButton} onClick={handlePreviousQuestion}>
                                    Poprzednie
                                </button>
                            )}
                        </div>

                        <button
                            className={`${styles.nextButton} ${selectedAnswer === null ? styles.disabled : ''}`}
                            onClick={handleNextQuestion}
                            disabled={selectedAnswer === null}
                        >
                            {currentQuestion === testData[selectedTest].questions.length - 1
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
