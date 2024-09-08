import { NEXT_MAIL_SERVER_HOST, NEXT_SMTP_MAIL_SERVER_PORT } from '@/config';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const createSmtpInstance = (email: string, password: string) => {
  const options: SMTPTransport.Options = {
    host: NEXT_MAIL_SERVER_HOST,
    port: Number(NEXT_SMTP_MAIL_SERVER_PORT),
    auth: {
      user: email,
      pass: password
    },
    secure: false
  };
  const connection = createTransport(options);
  return connection;
};
