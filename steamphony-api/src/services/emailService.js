import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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

    // Load external templates JSON if present
    const tplPath = path.resolve('email-templates-json.json');
    try {
      this.templatesJSON = JSON.parse(fs.readFileSync(tplPath, 'utf-8'));
    } catch (err) {
      console.warn('Email templates JSON not found or invalid', err.message);
      this.templatesJSON = null;
    }
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

  /* ---- New advanced templates ---- */
  templates = {
    contactAutoResponse: this.templatesJSON?.autoResponse || null,
    teamNotification: this.templatesJSON?.teamNotification || null,
    callbackConfirmation: this.templatesJSON?.callbackConfirmation || null,
    auditDelivery: this.templatesJSON?.auditDelivery || null,
  };

  // Simple {{var}} interpolation
  render(str, data) {
    return str.replace(/{{\s*(\w+)\s*}}/g, (_, key) => data[key] || '');
  }

  async sendAdvancedLead(data) {
    const auto = this.templates.contactAutoResponse || { subject: 'Спасибо', body: 'Спасибо' };
    const team = this.templates.teamNotification || { subject: 'Lead', body: 'Lead' };
    await this.transporter.sendMail({ from: process.env.SMTP_FROM, to: data.email, subject: this.render(auto.subject, data), html: this.render(auto.body, data) });
    await this.transporter.sendMail({ from: process.env.SMTP_FROM, to: process.env.ADMIN_EMAIL, subject: this.render(team.subject, data), html: this.render(team.body, data) });
  }

  async sendCallbackRequest(data) {
    const tpl = this.templates.callbackConfirmation || { subject: 'Callback', body: 'Callback' };
    await this.transporter.sendMail({ from: process.env.SMTP_FROM, to: process.env.ADMIN_EMAIL, subject: this.render(tpl.subject, data), html: this.render(tpl.body, data) });
  }

  async sendAuditRequest(data) {
    const tpl = this.templates.auditDelivery || { subject: 'Audit', body: 'Audit' };
    await this.transporter.sendMail({ from: process.env.SMTP_FROM, to: process.env.ADMIN_EMAIL, subject: this.render(tpl.subject, data), html: this.render(tpl.body, data) });
  }
}

const emailService = new EmailService();
export default emailService; 