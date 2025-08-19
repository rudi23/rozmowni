import { sendContactFormEmailNotification } from '../../utils/emailService';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    // Send email using the shared service
    await sendContactFormEmailNotification({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Return success response
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact form email:', error);

    // Return appropriate error response
    res.status(500).json({
      error: error.message,
      details: error.details || error.message,
      code: error.code,
    });
  }
}
