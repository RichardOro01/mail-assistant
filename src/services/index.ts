import { IReplyEmailRequest, ISendEmailRequest } from '@/types/smtp';
import { fetcher } from './fetcher';
import { replyEmail, sendEmail } from './smtp';

export const emailService = {
  sendEmail: (data: ISendEmailRequest) => fetcher(() => sendEmail(data)),
  replyEmail: (data: IReplyEmailRequest) => fetcher(() => replyEmail(data))
};
