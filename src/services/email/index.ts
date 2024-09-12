import { IReplyEmailRequest, ISendEmailRequest } from '@/types/smtp';
import { fetcher } from '../fetcher';
import { replyEmail, sendEmail } from './smtp';
import { auth, deleteMessage, getMessageByUid, getMessages } from './imap';

export const emailService = {
  auth: (email: string, password: string) => fetcher(() => auth(email, password)),
  sendEmail: (data: ISendEmailRequest) => fetcher(() => sendEmail(data)),
  replyEmail: (data: IReplyEmailRequest) => fetcher(() => replyEmail(data)),
  deleteEmail: (id: number) => fetcher(() => deleteMessage(id)),
  getMails: (search?: string) => fetcher(() => getMessages(search)),
  getMailByUid: (id: number) => fetcher(() => getMessageByUid(id))
};
