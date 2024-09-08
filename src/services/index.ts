import { ISendEmailRequest } from '@/types/smtp';
import { fetcher } from './fetcher';
import { sendEmail } from './smtp';

export const emailService = {
  sendEmail: (data: ISendEmailRequest) => fetcher(() => sendEmail(data))
};
