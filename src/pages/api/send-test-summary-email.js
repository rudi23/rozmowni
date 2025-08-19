import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import TestResultsEmail from '../../emails/TestResultsEmail.jsx';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fullName, email, testScore, testLevel, testType, totalQuestions } =
      req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !testScore ||
      !testLevel ||
      !testType ||
      !totalQuestions
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Render the email template
    const emailHtml = await render(
      <TestResultsEmail
        fullName={fullName}
        testScore={testScore}
        testLevel={testLevel}
        testType={testType}
        totalQuestions={totalQuestions}
      />,
    );

    // Email options
    const mailOptions = {
      from: process.env.SMTP_FROM || 'Rozmowni.pl <noreply@rozmowni.pl>',
      to: email,
      subject: 'Twój wynik testu + darmowy e-book "Czas na angielski"',
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
    });

    // Handle specific SMTP errors
    let errorMessage = 'Failed to send email';
    let errorDetails = error.message;

    if (error.code === 'EAUTH') {
      errorMessage = 'SMTP authentication failed';
      errorDetails =
        "Please check your SMTP_USER and SMTP_PASS in .env.local file. For Gmail, make sure you're using an App Password, not your regular password.";
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'SMTP connection failed';
      errorDetails = 'Please check your SMTP_HOST and SMTP_PORT settings.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'SMTP connection timeout';
      errorDetails =
        'The SMTP server is not responding. Please check your internet connection and SMTP settings.';
    }

    // Return more detailed error information
    res.status(500).json({
      error: errorMessage,
      details: errorDetails,
      code: error.code,
      help: 'Check SMTP_SETUP.md for configuration instructions',
    });
  }
}
