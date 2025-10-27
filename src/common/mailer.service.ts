// src/common/mailer.service.ts
import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class MailerService {
  private transport;
  constructor() {
    this.transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });
  }

  async sendAsanaFormEmail(to: string, asanaFormUrl: string) {
    await this.transport.sendMail({
      from: '"CRM System" <no-reply@crm.local>',
      to,
      subject: 'Please fill out your details',
      html: `<p>Fill your details in <a href="${asanaFormUrl}">this form</a></p>`,
    });
  }
}
