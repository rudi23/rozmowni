import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faComments,
  faBullseye,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import PageHeader from '../PageHeader';
import Section from '../Section';
import TrustPoints from '../TrustPoints';
import { testData, getLevel } from '../../data/testData';
import { createAuthHeaders } from '../../utils/apiAuth';
import useFacebookEventTracking from '../../hooks/useFacebookEventTracking';
import useClickTracking from '../../hooks/useClickTracking';
import { events, facebookEvents } from '../../services/tracking';
import {
  createEventId,
  getBrowserIds,
} from '../../services/tracking/facebookPixel';
import {
  getRequestHeadersAsync,
  sendExceptionAsync,
} from '../../services/tracking/posthog';
import styles from './TestResultsView.module.scss';

const trialBenefits = [
  {
    icon: faComments,
    title: 'Indywidualny feedback',
    description:
      'Usłyszysz, co już Ci wychodzi i nad czym warto popracować najpierw',
  },
  {
    icon: faBullseye,
    title: 'Sprawdzona metoda',
    description:
      'Poznasz nasz sposób nauczania skupiony na konwersacjach od pierwszej lekcji',
  },
  {
    icon: faEdit,
    title: 'Spersonalizowany plan',
    description:
      'Ustalisz konkretny plan nauki dopasowany do Twoich celów i stylu życia',
  },
];

// Component for the form and results view
const TestResultsFormView = ({ score, selectedTest, onFormSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState(null);
  // One id per mounted form, minted on the first submit and kept across retries.
  const facebookEventIdRef = useRef(null);
  const level = getLevel(score, selectedTest);
  const trackFacebookEvent = useFacebookEventTracking();
  const trackClick = useClickTracking();

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

    // Minted here rather than inside the tracking hook: the server copy of this
    // conversion rides along in the request below, which is sent before the
    // pixel fires, and both copies have to carry the same id to deduplicate.
    //
    // Held in a ref so a retry reuses it. The route reports the conversion to
    // Meta before it answers, so a submit whose response is lost still counted
    // - minting a fresh id on the retry would leave the first report unpaired
    // and Meta would record two leads for one person.
    if (!facebookEventIdRef.current) {
      facebookEventIdRef.current = createEventId();
    }

    const facebookEventId = facebookEventIdRef.current;

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
        headers: {
          ...createAuthHeaders(),
          ...(await getRequestHeadersAsync()),
        },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone || '',
          contactMethod: data.contactMethod,
          testScore: formDataWithScore.testScore,
          testLevel: formDataWithScore.testLevel,
          testType: formDataWithScore.testType,
          totalQuestions: testData[selectedTest].questions.length,
          // Analytics only: `testScore` is the display string that goes to the
          // CSV and the emails, and `testLevel` carries the level title with it.
          // Neither can change shape, so PostHog gets its own plain values.
          correctAnswers: score,
          testLevelCode: level?.level,
          // Lets the route report this conversion to Meta server-side, matched
          // on the hashed email it already has and on Meta's own cookies, which
          // the server cannot read for itself.
          facebookEventId,
          ...getBrowserIds(),
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send email');
      }

      // Close the form for good the moment the submission is known to be
      // successful - the view only switches 3s later, via the timeout below
      setIsSubmitted(true);

      // Contact details accepted - track only once the email actually went out.
      // Last step of the GA funnel: without it the lead capture rate cannot be
      // computed in GA4 at all, since the FB event lives in a separate system.
      trackClick(
        events.TEST_CONTACT_DETAILS_SENT(
          selectedTest,
          score,
          testData[selectedTest].questions.length,
          level?.level,
        ),
      );
      trackFacebookEvent(
        facebookEvents.TEST_CONTACT_DETAILS_SUBMITTED(selectedTest),
        facebookEventId,
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
      sendExceptionAsync(error);
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
      <PageHeader
        title="Test ukończony"
        lede="Zostaw swój adres e-mail, a wyślemy zapis wyniku, e-book i zaproszenie na bezpłatną lekcję próbną."
      />

      {/* The level and the form used to be three sections apart. */}
      <Section>
        <div className={styles.resultsGrid}>
          <div className={styles.levelColumn}>
            <h2 className={styles.levelHeading}>
              Twój poziom języka angielskiego
            </h2>
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
              Dołączasz do grona ponad <strong>100 osób</strong>, które
              sprawdziły swój poziom angielskiego.
            </p>
          </div>

          <div className={styles.formColumn}>
            <h2 className={styles.formHeading}>
              Odbierz e-book i bezpłatną lekcję próbną
            </h2>
            <p className={styles.formNote}>
              Wszystko wyślemy na Twój adres e-mail.
            </p>

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
              <div className={styles.formGroup}>
                <label htmlFor="fullName">
                  Imię i nazwisko <span className={styles.required}>*</span>
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

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email <span className={styles.required}>*</span>
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

              <div className={styles.formGroup}>
                <label htmlFor="phone">
                  Numer telefonu
                  {contactMethod === 'phone' ? (
                    <span className={styles.required}> *</span>
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

              <div className={styles.formGroup}>
                <span className={styles.radioLabel}>
                  Jak mamy się odezwać w sprawie lekcji próbnej?
                </span>
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
                className={styles.submitButton}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij wynik i e-book'}
              </button>

              <TrustPoints
                className={styles.guarantee}
                items={['Bez spamu', 'Dane bezpieczne']}
              />
            </form>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className={styles.trialBenefitsSection}>
          <h2 className={styles.trialHeading}>
            Co zyskasz dzięki bezpłatnej lekcji próbnej?
          </h2>
          <ul className={styles.benefitsGrid}>
            {trialBenefits.map(({ icon, title, description }) => (
              <li className={styles.benefitCard} key={title}>
                <FontAwesomeIcon icon={icon} className={styles.benefitIcon} />
                <h3 className={styles.benefitTitle}>{title}</h3>
                <p className={styles.benefitText}>{description}</p>
              </li>
            ))}
          </ul>
          <p className={styles.socialProofBanner}>
            <strong>90% uczniów</strong> poleca nasze lekcje próbne i kontynuuje
            naukę z nami.
          </p>
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
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
          <div className={styles.successContent}>
            <h2>Dziękujemy!</h2>
            <p>
              Zapis Twojego wyniku oraz e-book „Czas na angielski” wysłaliśmy na
              podany adres email.
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
