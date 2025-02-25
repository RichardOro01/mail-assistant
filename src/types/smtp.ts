import { SentMessageInfo } from 'nodemailer';

export interface ISendEmailRequest {
  to: string;
  subject: string;
  text: string;
}

export interface IReplyEmailRequest {
  text: string;
  replyTo: string;
  messageId: string;
  subject: string;
}

export interface IReplyEmailForm {
  to: string;
  text: string;
}

export type ISendEmailResponse = SentMessageInfo;
export type IReplyEmailResponse = SentMessageInfo;
