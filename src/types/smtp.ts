import { SentMessageInfo } from 'nodemailer';

export interface ISendEmailRequest {
  to: string;
  subject: string;
  text: string;
}

export type ISendEmailResponse = SentMessageInfo;
