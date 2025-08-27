import { useState, useEffect, useMemo } from 'react';
import { render } from '@react-email/render';
import TestResultsEmail from '../emails/TestResultsEmail.jsx';
import ContactFormNotificationEmail from '../emails/ContactFormEmail.jsx';
import TestResultsNotificationEmail from '../emails/TestResultsNotificationEmail.jsx';
import { createAuthHeaders } from '../utils/apiAuth';

// Constants
const EMAIL_TYPES = {
  TEST_RESULTS: 'test-results',
  CONTACT_FORM: 'contact-form',
  TEST_NOTIFICATION: 'test-notification',
};

const TEST_TYPES = {
  ADULTS: 'adults',
  TEENS: 'teens',
};

const BUTTON_STYLES = {
  primary: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  success: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  warning: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  disabled: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'not-allowed',
    whiteSpace: 'nowrap',
  },
};

const INPUT_STYLES = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: 'white',
};

const SELECT_STYLES = {
  padding: '10px 15px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: 'white',
  minWidth: '200px',
};

const SECTION_STYLES = {
  marginBottom: '30px',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  border: '1px solid #e9ecef',
};

// Test data
const TEST_DATA = {
  adults: {
    fullName: 'Jan Kowalski',
    testScore: '18/25',
    testLevel: 'B2 - Intermediate',
    testType: TEST_TYPES.ADULTS,
    totalQuestions: 25,
    phone: '+48 123 456 789',
    contactMethod: 'phone',
  },
  teens: {
    fullName: 'Anna Nowak',
    testScore: '15/22',
    testLevel: 'B1 - Poziom średniozaawansowany',
    testType: TEST_TYPES.TEENS,
    totalQuestions: 22,
    phone: '+48 987 654 321',
    contactMethod: 'email',
  },
  contact: {
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '+48 123 456 789',
    subject: 'Zapytanie o kurs dla dorosłych',
    message:
      'Dzień dobry,\n\nInteresuję się kursami angielskiego dla dorosłych. Chciałbym dowiedzieć się więcej o:\n- Harmonogramie zajęć\n- Cenniku\n- Metodzie nauczania\n\nCzy możecie przesłać mi więcej informacji?\n\nZ poważaniem,\nJan Kowalski',
  },
};

// Utility functions
const validateEmail = (email) => {
  return email && email.includes('@');
};

const getButtonStyle = (variant, isDisabled) => {
  if (isDisabled) {
    return BUTTON_STYLES.disabled;
  }

  return BUTTON_STYLES[variant] || BUTTON_STYLES.primary;
};

const getEmailTitle = (emailType, testType) => {
  switch (emailType) {
    case EMAIL_TYPES.TEST_RESULTS:
      return testType === TEST_TYPES.ADULTS
        ? 'Email - Test dla dorosłych'
        : 'Email - Test dla młodzieży';
    case EMAIL_TYPES.CONTACT_FORM:
      return 'Email - Formularz kontaktowy';
    case EMAIL_TYPES.TEST_NOTIFICATION:
      return 'Email - Powiadomienie o teście';
    default:
      return 'Email Preview';
  }
};

const getTestDataForEmail = (emailType, testType) => {
  switch (emailType) {
    case EMAIL_TYPES.TEST_RESULTS:
      return testType === TEST_TYPES.ADULTS
        ? TEST_DATA.adults
        : TEST_DATA.teens;
    case EMAIL_TYPES.CONTACT_FORM:
      return TEST_DATA.contact;
    case EMAIL_TYPES.TEST_NOTIFICATION:
      return TEST_DATA.adults;
    default:
      return TEST_DATA.adults;
  }
};

// Components
const EmailTypeSelector = ({
  selectedEmailType,
  onEmailTypeChange,
  selectedTestType,
  onTestTypeChange,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <label
      htmlFor="emailType"
      style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
    >
      Wybierz typ emaila:
    </label>
    <select
      id="emailType"
      value={selectedEmailType}
      onChange={(e) => onEmailTypeChange(e.target.value)}
      style={{ ...SELECT_STYLES, marginRight: '15px' }}
    >
      <option value={EMAIL_TYPES.TEST_RESULTS}>
        Wyniki testu poziomującego
      </option>
      <option value={EMAIL_TYPES.CONTACT_FORM}>Formularz kontaktowy</option>
      <option value={EMAIL_TYPES.TEST_NOTIFICATION}>
        Powiadomienie o teście
      </option>
    </select>

    {selectedEmailType === EMAIL_TYPES.TEST_RESULTS && (
      <select
        value={selectedTestType}
        onChange={(e) => onTestTypeChange(e.target.value)}
        style={SELECT_STYLES}
      >
        <option value={TEST_TYPES.ADULTS}>Wynik dla dorosłego</option>
        <option value={TEST_TYPES.TEENS}>Wynik dla młodzieży</option>
      </select>
    )}
  </div>
);

const TestEmailSection = ({
  title,
  email,
  onEmailChange,
  onSend,
  isSending,
  buttonVariant = 'primary',
  placeholder = 'admin@example.com',
}) => (
  <div style={SECTION_STYLES}>
    <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
      {title}
    </h3>
    <div
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: 1, minWidth: '250px' }}>
        <label
          htmlFor="emailInput"
          style={{
            display: 'block',
            marginBottom: '5px',
            fontSize: '14px',
            fontWeight: '500',
          }}
        >
          Adres email:
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder={placeholder}
          style={INPUT_STYLES}
        />
      </div>
      <button
        onClick={onSend}
        disabled={isSending || !validateEmail(email)}
        style={getButtonStyle(
          buttonVariant,
          isSending || !validateEmail(email),
        )}
      >
        {isSending ? 'Wysyłanie...' : 'Wyślij testowy email'}
      </button>
    </div>
  </div>
);

const TestResultMessage = ({ result }) => {
  if (!result) return null;

  return (
    <div
      style={{
        marginBottom: '30px',
        padding: '12px',
        borderRadius: '6px',
        backgroundColor: result.success ? '#d4edda' : '#f8d7da',
        color: result.success ? '#155724' : '#721c24',
        border: `1px solid ${result.success ? '#c3e6cb' : '#f5c6cb'}`,
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        {result.success ? 'Sukces!' : 'Błąd!'}
      </div>
      <div>{result.message}</div>
      {result.details && (
        <div style={{ marginTop: '8px', fontSize: '14px', opacity: 0.8 }}>
          Szczegóły: {result.details}
        </div>
      )}
      {result.data && result.data.debug && (
        <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
          <strong>Debug:</strong> {JSON.stringify(result.data.debug, null, 2)}
        </div>
      )}
    </div>
  );
};

const EmailPreview = ({ html, title, testData }) => (
  <div>
    <h2>{title}</h2>
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f6f9fc',
        borderRadius: '8px',
        maxHeight: '600px',
        overflow: 'auto',
      }}
    />
    <div
      style={{
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
      }}
    >
      <h4>Dane testowe:</h4>
      <pre style={{ fontSize: '12px' }}>
        {JSON.stringify(testData, null, 2)}
      </pre>
    </div>
  </div>
);

// Main component
export default function EmailPreviewPage() {
  // State
  const [emailHtmls, setEmailHtmls] = useState({
    adults: '',
    youth: '',
    contact: '',
    notification: '',
  });
  const [loading, setLoading] = useState(true);
  const [selectedEmailType, setSelectedEmailType] = useState(
    EMAIL_TYPES.TEST_RESULTS,
  );
  const [selectedTestType, setSelectedTestType] = useState(TEST_TYPES.ADULTS);
  const [testEmails, setTestEmails] = useState({
    testResults: 'krzysztof.rudowski@gmail.com',
    contact: 'krzysztof.rudowski@gmail.com',
    notification: 'krzysztof.rudowski@gmail.com',
  });
  const [sendingStates, setSendingStates] = useState({
    testResults: false,
    contact: false,
    notification: false,
  });
  const [testResult, setTestResult] = useState(null);

  // Memoized test data
  const adultsTestData = useMemo(() => TEST_DATA.adults, []);
  const youthTestData = useMemo(() => TEST_DATA.teens, []);
  const contactFormData = useMemo(() => TEST_DATA.contact, []);

  // Email rendering effect
  useEffect(() => {
    async function renderEmails() {
      try {
        const [adultsHtml, youthHtml, contactHtml, notificationHtml] =
          await Promise.all([
            render(<TestResultsEmail {...adultsTestData} />),
            render(<TestResultsEmail {...youthTestData} />),
            render(<ContactFormNotificationEmail {...contactFormData} />),
            render(
              <TestResultsNotificationEmail
                {...adultsTestData}
                email="jan.kowalski@example.com"
              />,
            ),
          ]);

        setEmailHtmls({
          adults: adultsHtml,
          youth: youthHtml,
          contact: contactHtml,
          notification: notificationHtml,
        });
      } catch (error) {
        console.error('Error rendering emails:', error);
      } finally {
        setLoading(false);
      }
    }

    renderEmails();
  }, [adultsTestData, youthTestData, contactFormData]);

  // Email sending functions
  const sendTestResultsEmail = async () => {
    const email = testEmails.testResults;
    if (!validateEmail(email)) {
      setTestResult({
        success: false,
        message: 'Proszę podać prawidłowy adres email',
      });

      return;
    }

    setSendingStates((prev) => ({ ...prev, testResults: true }));
    setTestResult(null);

    try {
      const testData =
        selectedTestType === TEST_TYPES.ADULTS ? adultsTestData : youthTestData;

      const response = await fetch(
        '/api/send-test-results?emailType=results-only',
        {
          method: 'POST',
          headers: createAuthHeaders(),
          body: JSON.stringify({
            fullName: testData.fullName,
            email,
            phone: testData.phone,
            contactMethod: testData.contactMethod,
            testScore: testData.testScore,
            testLevel: testData.testLevel,
            testType: testData.testType,
            totalQuestions: testData.totalQuestions,
          }),
        },
      );

      const result = await response.json();

      setTestResult({
        success: response.ok,
        message: response.ok
          ? 'Testowy email wysłany pomyślnie!'
          : result.error || 'Błąd podczas wysyłania emaila',
        details: result.details,
        data: result,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Błąd połączenia',
        details: error.message,
      });
    } finally {
      setSendingStates((prev) => ({ ...prev, testResults: false }));
    }
  };

  const sendContactFormEmail = async () => {
    const email = testEmails.contact;
    if (!validateEmail(email)) {
      setTestResult({
        success: false,
        message: 'Proszę podać prawidłowy adres email',
      });

      return;
    }

    setSendingStates((prev) => ({ ...prev, contact: true }));
    setTestResult(null);

    try {
      const response = await fetch('/api/send-contact-form-notification', {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify({
          name: contactFormData.name,
          email,
          phone: contactFormData.phone,
          subject: contactFormData.subject,
          message: contactFormData.message,
        }),
      });

      const result = await response.json();

      setTestResult({
        success: response.ok,
        message: response.ok
          ? 'Testowy email kontaktowy wysłany pomyślnie!'
          : result.error || 'Błąd podczas wysyłania emaila',
        details: result.details,
        data: result,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Błąd połączenia',
        details: error.message,
      });
    } finally {
      setSendingStates((prev) => ({ ...prev, contact: false }));
    }
  };

  const sendNotificationEmail = async () => {
    const email = testEmails.notification;
    if (!validateEmail(email)) {
      setTestResult({
        success: false,
        message: 'Proszę podać prawidłowy adres email',
      });

      return;
    }

    setSendingStates((prev) => ({ ...prev, notification: true }));
    setTestResult(null);

    try {
      const url = '/api/send-test-results?emailType=notification-only';

      const response = await fetch(url, {
        method: 'POST',
        headers: createAuthHeaders(),
        body: JSON.stringify({
          fullName: adultsTestData.fullName,
          email,
          testScore: adultsTestData.testScore,
          testLevel: adultsTestData.testLevel,
          testType: adultsTestData.testType,
          totalQuestions: adultsTestData.totalQuestions,
        }),
      });

      const result = await response.json();

      setTestResult({
        success: response.ok,
        message: response.ok
          ? 'Powiadomienie do admina wysłane pomyślnie!'
          : result.error || 'Błąd podczas wysyłania emaila',
        details: result.details,
        data: result,
      });
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Błąd połączenia',
        details: error.message,
      });
    } finally {
      setSendingStates((prev) => ({ ...prev, notification: false }));
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <h1>Email Preview</h1>
        <p>Loading email templates...</p>
      </div>
    );
  }

  // Get current email HTML and data
  const getCurrentEmailHtml = () => {
    switch (selectedEmailType) {
      case EMAIL_TYPES.TEST_RESULTS:
        return selectedTestType === TEST_TYPES.ADULTS
          ? emailHtmls.adults
          : emailHtmls.youth;
      case EMAIL_TYPES.CONTACT_FORM:
        return emailHtmls.contact;
      case EMAIL_TYPES.TEST_NOTIFICATION:
        return emailHtmls.notification;
      default:
        return emailHtmls.adults;
    }
  };

  const currentTestData = getTestDataForEmail(
    selectedEmailType,
    selectedTestType,
  );
  const currentEmailTitle = getEmailTitle(selectedEmailType, selectedTestType);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Email Preview</h1>
      <p>Podgląd szablonów email:</p>

      <EmailTypeSelector
        selectedEmailType={selectedEmailType}
        onEmailTypeChange={setSelectedEmailType}
        selectedTestType={selectedTestType}
        onTestTypeChange={setSelectedTestType}
      />

      {/* Test Email Sections */}
      {selectedEmailType === EMAIL_TYPES.TEST_RESULTS && (
        <TestEmailSection
          title="Wyślij testowy email z wynikami testu"
          email={testEmails.testResults}
          onEmailChange={(email) =>
            setTestEmails((prev) => ({ ...prev, testResults: email }))
          }
          onSend={sendTestResultsEmail}
          isSending={sendingStates.testResults}
          buttonVariant="primary"
        />
      )}

      {selectedEmailType === EMAIL_TYPES.CONTACT_FORM && (
        <TestEmailSection
          title="Wyślij testowy email z formularza kontaktowego"
          email={testEmails.contact}
          onEmailChange={(email) =>
            setTestEmails((prev) => ({ ...prev, contact: email }))
          }
          onSend={sendContactFormEmail}
          isSending={sendingStates.contact}
          buttonVariant="primary"
        />
      )}

      {selectedEmailType === EMAIL_TYPES.TEST_NOTIFICATION && (
        <TestEmailSection
          title="Wyślij testowe powiadomienie do admina"
          email={testEmails.notification}
          onEmailChange={(email) =>
            setTestEmails((prev) => ({ ...prev, notification: email }))
          }
          onSend={sendNotificationEmail}
          isSending={sendingStates.notification}
          buttonVariant="primary"
        />
      )}

      <TestResultMessage result={testResult} />

      <EmailPreview
        html={getCurrentEmailHtml()}
        title={currentEmailTitle}
        testData={currentTestData}
      />
    </div>
  );
}
