import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendContactNotification(contactData) {
    const { name, email, phone, businessType, message, language } = contactData;

    // Email to admin
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form - ${businessType || 'Unknown'} Business`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Business Type:</strong> ${businessType || 'Not specified'}</p>
        <p><strong>Language:</strong> ${language}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
      `,
    });

    // Auto-reply to client
    const clientSubject = language === 'ru' ? 'Спасибо за обращение - Steamphony' : 'Thank you for contacting us - Steamphony';

    const clientMessage = language === 'ru'
      ? `
        <h2>Спасибо за ваше обращение!</h2>
        <p>Привет, ${name}!</p>
        <p>Мы получили ваше сообщение и свяжемся с вами в течение 24 часов.</p>
        <p>Наша команда уже анализирует ваш запрос.</p>
        <br>
        <p>С уважением,<br>Команда Steamphony</p>
      `
      : `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name}!</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>Our team is already analyzing your request.</p>
        <br>
        <p>Best regards,<br>The Steamphony Team</p>
      `;

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: clientSubject,
      html: clientMessage,
    });

    return true;
  }
}

const emailService = new EmailService();
export default emailService; 