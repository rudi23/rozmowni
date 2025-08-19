import nodemailer from 'nodemailer';
import { render } from '@react-email/render';

/**
 * Email service utility for sending emails using React Email templates
 */
class EmailService {
  constructor() {
    this.transporter = null;
  }

  /**
   * Initialize SMTP transporter
   */
  initializeTransporter() {
    // Check SMTP configuration
    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_FROM ||
      !process.env.SMTP_PORT ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.NOTIFICATIONS_EMAIL
    ) {
      throw new Error(
        'SMTP configuration missing. Please check your environment variables.',
      );
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  /**
   * Render React Email template to HTML
   */
  async renderEmailTemplate(EmailComponent, props) {
    try {
      return await render(<EmailComponent {...props} />);
    } catch (error) {
      console.error('Error rendering email template:', error);
      throw new Error('Failed to render email template');
    }
  }

  /**
   * Send email with error handling
   */
  async sendEmail(mailOptions) {
    if (!this.transporter) {
      this.initializeTransporter();
    }

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        command: error.command,
      });

      this.handleEmailError(error);
    }
  }

  /**
   * Handle specific email errors and provide user-friendly messages
   */
  handleEmailError(error) {
    let errorMessage = 'Failed to send email';
    let errorDetails = error.message;

    switch (error.code) {
      case 'EAUTH':
        errorMessage = 'SMTP authentication failed';
        errorDetails =
          "Please check your SMTP_USER and SMTP_PASS in .env.local file. For Gmail, make sure you're using an App Password, not your regular password.";
        break;
      case 'ECONNECTION':
        errorMessage = 'SMTP connection failed';
        errorDetails = 'Please check your SMTP_HOST and SMTP_PORT settings.';
        break;
      case 'ETIMEDOUT':
        errorMessage = 'SMTP connection timeout';
        errorDetails =
          'The SMTP server is not responding. Please check your internet connection and SMTP settings.';
        break;
      default:
        errorMessage = 'Failed to send email';
        errorDetails = error.message;
    }

    const emailError = new Error(errorMessage);
    emailError.details = errorDetails;
    emailError.code = error.code;
    throw emailError;
  }

  /**
   * Send contact form notification email
   */
  async sendContactFormEmailNotification({
    name,
    email,
    phone,
    subject,
    message,
  }) {
    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Import email template dynamically to avoid circular dependencies
    const { default: ContactFormEmail } = await import(
      '../emails/ContactFormEmail.jsx'
    );

    // Render email template
    const emailHtml = await this.renderEmailTemplate(ContactFormEmail, {
      name,
      email,
      phone,
      subject,
      message,
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATIONS_EMAIL,
      subject: `Rozmowni.pl - Wiadomość z formularza kontaktowego - [${name}]`,
      html: emailHtml,
      replyTo: email, // Set reply-to to the sender's email
    };

    // Send email
    await this.sendEmail(mailOptions);
  }

  /**
   * Send test results email
   */
  async sendTestResultsEmail({
    fullName,
    email,
    testScore,
    testLevel,
    testType,
    totalQuestions,
  }) {
    // Validate required fields
    if (
      !fullName ||
      !email ||
      !testScore ||
      !testLevel ||
      !testType ||
      !totalQuestions
    ) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    // Import email template dynamically to avoid circular dependencies
    const { default: TestResultsEmail } = await import(
      '../emails/TestResultsEmail.jsx'
    );

    // Render email template
    const emailHtml = await this.renderEmailTemplate(TestResultsEmail, {
      fullName,
      testScore,
      testLevel,
      testType,
      totalQuestions,
    });

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Twój wynik testu + darmowy e-book "Czas na angielski"',
      html: emailHtml,
      replyTo: process.env.SMTP_FROM,
    };

    // Send email
    await this.sendEmail(mailOptions);
  }

  async sendTestResultsEmailNotification({
    fullName,
    email,
    testScore,
    testLevel,
    testType,
    totalQuestions,
  }) {
    // Validate required fields
    if (
      !fullName ||
      !email ||
      !testScore ||
      !testLevel ||
      !testType ||
      !totalQuestions
    ) {
      throw new Error('Missing required fields');
    }

    // Import email template dynamically to avoid circular dependencies
    const { default: TestResultsNotificationEmail } = await import(
      '../emails/TestResultsNotificationEmail.jsx'
    );

    // Render email template
    const emailHtml = await this.renderEmailTemplate(
      TestResultsNotificationEmail,
      {
        fullName,
        email,
        testScore,
        testLevel,
        testType,
        totalQuestions,
      },
    );

    // Prepare mail options
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.NOTIFICATIONS_EMAIL,
      subject: `Rozmowni.pl - Nowy użytkownik ukończył test - [${fullName}]`,
      html: emailHtml,
      replyTo: process.env.SMTP_FROM,
    };

    // Send email
    await this.sendEmail(mailOptions);
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export individual methods for convenience with proper binding
export const sendContactFormEmailNotification =
  emailService.sendContactFormEmailNotification.bind(emailService);
export const sendTestResultsEmail =
  emailService.sendTestResultsEmail.bind(emailService);
export const sendTestResultsEmailNotification =
  emailService.sendTestResultsEmailNotification.bind(emailService);
export const validateEmail = emailService.validateEmail.bind(emailService);
