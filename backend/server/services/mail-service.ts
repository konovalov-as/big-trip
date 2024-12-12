import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer';
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from '@config/app';
import * as console from "console";

class MailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: true,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      }
    });
  }

  async sendActivationMail(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject,
      text: '',
      html,
    })
  }
}

const mailService = new MailService();

export {
  mailService,
}
