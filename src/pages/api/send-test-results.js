import {
  sendTestResultsEmail,
  sendTestResultsEmailNotification,
} from '../../utils/emailService';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, testScore, testLevel, testType, totalQuestions } =
      req.body;

    // Check query parameter to determine which email to send
    const { emailType } = req.query;

    if (emailType === 'notification-only') {
      // Send only notification email to admin
      await sendTestResultsEmailNotification({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });

      res
        .status(200)
        .json({
          success: true,
          message: 'Notification email sent successfully',
        });
    } else if (emailType === 'results-only') {
      // Send only test results email to user
      await sendTestResultsEmail({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });

      res
        .status(200)
        .json({
          success: true,
          message: 'Test results email sent successfully',
        });
    } else {
      // Default: send both emails (original behavior)
      await sendTestResultsEmail({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });

      await sendTestResultsEmailNotification({
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      });

      res
        .status(200)
        .json({ success: true, message: 'Both emails sent successfully' });
    }
  } catch (error) {
    console.error('Error sending test results emails:', error);

    // Return appropriate error response
    res.status(500).json({
      error: error.message,
      details: error.details || error.message,
      code: error.code,
    });
  }
}
