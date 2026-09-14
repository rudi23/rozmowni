import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faPlay,
  faCheckCircle,
  faChartLine,
  faBook,
  faComments,
  faBullseye,
  faEdit,
  faDollarSign,
  faCheckSquare,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../PageHeader';
import Section from '../Section';
import { testData, getLevel } from '../../data/testData';
import { createAuthHeaders } from '../../utils/apiAuth';
import useFacebookEventTracking from '../../hooks/useFacebookEventTracking';
import { facebookEvents } from '../../services/tracking';
import styles from './TestResultsView.module.scss';

// Component for the form and results view
const TestResultsFormView = ({ score, selectedTest, onFormSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState(null);
  const level = getLevel(score, selectedTest);
  const trackFacebookEvent = useFacebookEventTracking();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
    control,
  } = useForm();

  // Watch the contactMethod field to conditionally validate phone
  const contactMethod = useWatch({
    control,
    name: 'contactMethod',
  });

  // Clear message when form changes
  const clearMessage = () => {
    if (message) {
      setMessage(null);
    }
  };

  const onSubmitContactForm = async (data) => {
    setIsSubmitting(true);

    // Add test score to form data
    const formDataWithScore = {
      ...data,
      testScore: `${score}/${testData[selectedTest].questions.length}`,
      testLevel: `${level.level} - ${level.title}`,
      testType: selectedTest, // This will be 'adults' or 'teens'
      source: 'Test poziomujący',
    };

    try {
      // Send email with test results
      const emailResponse = await fetch('/api/send-test-results', {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || '',
          contactMethod: data.contactMethod,
          testScore: formDataWithScore.testScore,
          testLevel: formDataWithScore.testLevel,
          testType: formDataWithScore.testType,
          totalQuestions: testData[selectedTest].questions.length,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      // Close the form for good the moment the submission is known to be
      // successful - the view only switches 3s later, via the timeout below
      setIsSubmitted(true);

      // Contact details accepted - track only once the email actually went out
      trackFacebookEvent(
        facebookEvents.TEST_CONTACT_DETAILS_SUBMITTED(selectedTest),
      );

      // Here you would normally send to your backend for contact form
      console.log('Form data:', formDataWithScore);

      // Simulate API call for contact form
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({
        type: 'success',
        text: 'Formularz został wysłany pomyślnie! Sprawdź swoją skrzynkę email.',
      });

      // Clear message after 3 seconds and proceed
      setTimeout(() => {
        onFormSubmitted();
        resetForm();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({
        type: 'error',
        text: 'Wystąpił błąd podczas wysyłania. Spróbuj ponownie.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageHeader title="Gratulacje! Test ukończony!" />
      {/* Result Section - White */}
      <Section>
        <div className={styles.quickScore}>
          <h2>Twój poziom języka angielskiego</h2>
          <div className={styles.scoreDisplay}>
            <div className={styles.scoreNumber}>{level.level}</div>
            <div className={styles.levelText}>{level.title}</div>
            <p className={styles.levelDescription}>{level.description}</p>
            <div className={styles.scoreDetails}>
              Poprawne odpowiedzi: {score} z{' '}
              {testData[selectedTest].questions.length}
            </div>
          </div>
          <p className={styles.socialProof}>
            Dołączasz do grona ponad <strong>100 osób</strong>, które sprawdziły
            swój poziom angielskiego
          </p>
        </div>
      </Section>
      {/* Value Proposition Section - Gray */}
      <Section background="gray">
        <div className={styles.valueSection}>
          <div className={styles.sectionHeading}>
            <h3>Odbierz e-book i bezpłatną lekcję próbną</h3>
            <p className={styles.sectionSubtitle}>
              Znasz już swój poziom. Na email wyślemy Ci e-book, zapis wyniku
              oraz zaproszenie na bezpłatną lekcję próbną
            </p>
          </div>

          <div className={styles.introText}>
            <p>
              <strong>
                Co dokładnie otrzymasz w mailu po wypełnieniu formularza:
              </strong>
            </p>
          </div>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <div className={styles.cardIcon}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h4>Twój wynik na piśmie</h4>
                <p>Zapis poziomu i punktacji, do którego możesz wrócić</p>
              </div>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.cardIcon}>
                <div className={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faBook} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h4>Darmowy e-book (12 stron)</h4>
                <p>"Czas na angielski" - kompletny przewodnik po czasach</p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* Contact Form Section - White */}
      <Section>
        <div className={styles.testCompletionForm}>
          <div className={styles.infoBox}>
            <h3>
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.inlineIcon}
              />
              Podaj swoje dane, aby odebrać e-book i lekcję próbną
            </h3>
            <p>
              Wszystkie informacje wyślemy na Twój adres email. Dane są w 100%
              bezpieczne.
            </p>
          </div>

          {/* Message Display */}
          {message && (
            <div
              className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`}
              role="alert"
            >
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmitContactForm)}
            className={styles.contactForm}
          >
            <div className="row">
              <div className="col-md-6 order-1">
                <div className={styles.formGroup}>
                  <label htmlFor="fullName">
                    Imię i nazwisko <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className={styles.formControl}
                    {...register('fullName', {
                      required: 'Imię i nazwisko jest wymagane',
                    })}
                    onChange={(e) => {
                      clearMessage();
                      register('fullName').onChange(e);
                    }}
                  />
                  {errors.fullName && (
                    <span className={styles.error}>
                      {errors.fullName.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 order-3 order-md-2">
                <div className={styles.formGroup}>
                  <label htmlFor="phone">
                    Numer telefonu
                    {contactMethod === 'phone' ? (
                      <span style={{ color: 'red' }}> *</span>
                    ) : (
                      ' (opcjonalnie)'
                    )}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className={styles.formControl}
                    {...register('phone', {
                      ...(contactMethod === 'phone' && {
                        required:
                          'Numer telefonu jest wymagany, gdy wybierzesz kontakt telefoniczny',
                        pattern: {
                          value: /^[+]?[\d\s\-()]+$/,
                          message: 'Nieprawidłowy format numeru telefonu',
                        },
                      }),
                    })}
                    onChange={(e) => {
                      clearMessage();
                      register('phone').onChange(e);
                    }}
                  />
                  {errors.phone && (
                    <span className={styles.error}>{errors.phone.message}</span>
                  )}
                </div>
              </div>
            </div>

            <div className={`${styles.formGroup} order-2 order-md-3`}>
              <label htmlFor="email">
                Email <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="email"
                id="email"
                className={styles.formControl}
                {...register('email', {
                  required: 'Email jest wymagany',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Nieprawidłowy format email',
                  },
                })}
                onChange={(e) => {
                  clearMessage();
                  register('email').onChange(e);
                }}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={`${styles.formGroup} order-4`}>
              <label className={styles.radioLabel}>
                Preferowany sposób kontaktu w celu umówienia bezpłatnej lekcji
                próbnej:
              </label>
              <div className={styles.radioGroup}>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="contactPhone"
                    value="phone"
                    {...register('contactMethod', {
                      required: 'Wybierz sposób kontaktu',
                    })}
                  />
                  <label htmlFor="contactPhone">Telefon</label>
                </div>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="contactEmail"
                    value="email"
                    {...register('contactMethod', {
                      required: 'Wybierz sposób kontaktu',
                    })}
                  />
                  <label htmlFor="contactEmail">Email</label>
                </div>
              </div>
              {errors.contactMethod && (
                <span className={styles.error}>
                  {errors.contactMethod.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.submitButton} order-5`}
              disabled={isSubmitting || isSubmitted}
            >
              {!isSubmitting && (
                <FontAwesomeIcon icon={faPlay} className="me-2" />
              )}
              {isSubmitting
                ? 'Wysyłanie...'
                : 'Wyślij i odbierz e-book + lekcję próbną'}
            </button>
          </form>
        </div>
      </Section>
      {/* Trial Benefits Section - Gray */}
      <Section background="gray">
        <div className={styles.trialBenefitsSection}>
          <div className={styles.sectionHeading}>
            <h3>Co zyskasz dzięki bezpłatnej lekcji próbnej?</h3>
            <p className={styles.sectionSubtitle}>
              Przekonaj się na własne oczy, dlaczego warto uczyć się z nami
            </p>
          </div>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faComments} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Indywidualny feedback</h4>
                <p>
                  Otrzymasz szczegółowe informacje o swoich mocnych stronach i
                  obszarach do poprawy
                </p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faBullseye} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Sprawdzona metoda</h4>
                <p>
                  Poznasz nasz unikatowy sposób nauczania skupiony na
                  konwersacjach
                </p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Spersonalizowany plan</h4>
                <p>
                  Ustalisz konkretny plan nauki dostosowany do Twoich celów i
                  stylu życia
                </p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faDollarSign} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Dopasowana oferta</h4>
                <p>
                  Otrzymasz propozycję kursu idealnie dopasowaną do Twoich
                  potrzeb i budżetu
                </p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Odpowiedzi na wszystkie pytania</h4>
                <p>
                  Zadasz wszystkie pytania o naukę, metodę, harmonogram i
                  organizację kursów
                </p>
              </div>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <FontAwesomeIcon icon={faCheckSquare} />
              </div>
              <div className={styles.benefitContent}>
                <h4>Bez zobowiązań</h4>
                <p>
                  Decydujesz po lekcji czy nasza szkoła jest dla Ciebie
                  odpowiednia
                </p>
              </div>
            </div>
          </div>
          <div className={styles.socialProofBanner}>
            <strong>90% uczniów</strong> poleca nasze lekcje próbne i kontynuuje
            naukę z nami
          </div>
        </div>
      </Section>
    </>
  );
};

// Component for the success message
const TestResultsSuccessView = () => {
  return (
    <>
      <PageHeader title="Gratulacje! Poznałeś swój poziom!" />
      <Section>
        <div className={styles.testCompletionForm}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
            <div className={styles.successContent}>
              <h3>Dziękujemy!</h3>
              <p>
                Zapis Twojego wyniku oraz e-book "Czas na angielski" wysłaliśmy
                na podany adres email.
              </p>
              <div className={styles.mailCheckReminder}>
                <p>
                  <strong>Mail już u Ciebie?</strong>
                </p>
                <p className={styles.reminderText}>
                  Powinien dotrzeć w ciągu kilku minut. Jeśli go nie widzisz,
                  zajrzyj do zakładki Oferty lub do folderu Spam. Przeciągnij
                  wiadomość do Odebranych, żeby kolejne trafiały od razu we
                  właściwe miejsce.
                </p>
              </div>
              <p>
                Wkrótce skontaktujemy się z Tobą w wybranej formie w celu
                umówienia bezpłatnej lekcji próbnej.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

// Main component that manages state and renders appropriate view
const TestResultsView = ({ score, selectedTest }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmitted = () => {
    setIsFormSubmitted(true);
  };

  // The form view is far taller than the success view, so scroll only once the
  // success view has rendered - see the matching effect in the test page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isFormSubmitted]);

  if (isFormSubmitted) {
    return <TestResultsSuccessView />;
  }

  return (
    <TestResultsFormView
      score={score}
      selectedTest={selectedTest}
      onFormSubmitted={handleFormSubmitted}
    />
  );
};

export default TestResultsView;
