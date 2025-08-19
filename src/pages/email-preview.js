import { useState, useEffect, useMemo } from 'react';
import { render } from '@react-email/render';
import TestResultsEmail from '../emails/TestResultsEmail.jsx';

export default function EmailPreview() {
  const [adultsEmailHtml, setAdultsEmailHtml] = useState('');
  const [youthEmailHtml, setYouthEmailHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedTestType, setSelectedTestType] = useState('adults');
  const [testEmail, setTestEmail] = useState('');
  const [sendingTest, setSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Test data for adults
  const adultsTestData = useMemo(
    () => ({
      fullName: 'Jan Kowalski',
      testScore: '18/25',
      testLevel: 'B2 - Intermediate',
      testType: 'adults',
      totalQuestions: 25,
    }),
    [],
  );

  // Test data for youth
  const youthTestData = useMemo(
    () => ({
      fullName: 'Anna Nowak',
      testScore: '15/22',
      testLevel: 'B1 - Poziom średniozaawansowany',
      testType: 'teens',
      totalQuestions: 22,
    }),
    [],
  );

  useEffect(() => {
    async function renderEmails() {
      try {
        // Render both emails
        const [adultsHtml, youthHtml] = await Promise.all([
          render(<TestResultsEmail {...adultsTestData} />),
          render(<TestResultsEmail {...youthTestData} />),
        ]);

        setAdultsEmailHtml(adultsHtml);
        setYouthEmailHtml(youthHtml);
      } catch (error) {
        console.error('Error rendering emails:', error);
      } finally {
        setLoading(false);
      }
    }

    renderEmails();
  }, [adultsTestData, youthTestData]);

  const sendTestEmail = async () => {
    if (!testEmail || !testEmail.includes('@')) {
      setTestResult({
        success: false,
        message: 'Proszę podać prawidłowy adres email',
      });

      return;
    }

    setSendingTest(true);
    setTestResult(null);

    try {
      const testData =
        selectedTestType === 'adults' ? adultsTestData : youthTestData;

      const response = await fetch('/api/send-test-summary-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: testData.fullName,
          email: testEmail,
          testScore: testData.testScore,
          testLevel: testData.testLevel,
          testType: testData.testType,
          totalQuestions: testData.totalQuestions,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setTestResult({
          success: true,
          message: 'Testowy email wysłany pomyślnie!',
          data: result,
        });
      } else {
        setTestResult({
          success: false,
          message: result.error || 'Błąd podczas wysyłania emaila',
          details: result.details,
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Błąd połączenia',
        details: error.message,
      });
    } finally {
      setSendingTest(false);
    }
  };

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

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Email Preview</h1>
      <p>Podgląd szablonu email z wynikami testu:</p>

      {/* Test Type Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="testType"
          style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
        >
          Wybierz typ testu:
        </label>
        <select
          id="testType"
          value={selectedTestType}
          onChange={(e) => setSelectedTestType(e.target.value)}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            backgroundColor: 'white',
            minWidth: '200px',
          }}
        >
          <option value="adults">Wynik dla dorosłego</option>
          <option value="teens">Wynik dla młodzieży</option>
        </select>
      </div>

      {/* Test Email Section */}
      <div
        style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef',
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
          Wyślij testowy email
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
              htmlFor="testEmail"
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
              id="testEmail"
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="twoj-email@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                backgroundColor: 'white',
              }}
            />
          </div>
          <button
            onClick={sendTestEmail}
            disabled={sendingTest || !testEmail}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: sendingTest ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: sendingTest ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {sendingTest ? 'Wysyłanie...' : 'Wyślij testowy email'}
          </button>
        </div>

        {/* Test Result */}
        {testResult && (
          <div
            style={{
              marginTop: '15px',
              padding: '12px',
              borderRadius: '6px',
              backgroundColor: testResult.success ? '#d4edda' : '#f8d7da',
              color: testResult.success ? '#155724' : '#721c24',
              border: `1px solid ${testResult.success ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {testResult.success ? '✅ Sukces!' : '❌ Błąd!'}
            </div>
            <div>{testResult.message}</div>
            {testResult.details && (
              <div style={{ marginTop: '8px', fontSize: '14px', opacity: 0.8 }}>
                Szczegóły: {testResult.details}
              </div>
            )}
            {testResult.data && testResult.data.debug && (
              <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
                <strong>Debug:</strong>{' '}
                {JSON.stringify(testResult.data.debug, null, 2)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Email Preview */}
      <div>
        <h2>
          {selectedTestType === 'adults'
            ? 'Email - Test dla dorosłych'
            : 'Email - Test dla młodzieży'}
        </h2>
        <div
          dangerouslySetInnerHTML={{
            __html:
              selectedTestType === 'adults' ? adultsEmailHtml : youthEmailHtml,
          }}
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
            {JSON.stringify(
              selectedTestType === 'adults' ? adultsTestData : youthTestData,
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
