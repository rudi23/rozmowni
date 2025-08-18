import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Create transporter using environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Prepare email content
        const emailContent = `
Imię i nazwisko: ${name}
Email: ${email}
Telefon: ${phone}
Temat: ${subject}
Wiadomość:
${message}
        `.trim();

        // Send email
        const mailOptions = {
            from: process.env.SMTP_FROM,
            to: process.env.NOTIFICATIONS_EMAIL,
            subject: 'Rozmowni.pl - formularz kontaktowy',
            text: emailContent,
            replyTo: email, // Set reply-to to the sender's email
        };

        await transporter.sendMail(mailOptions);

        // Return success response
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
}
