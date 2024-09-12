import { IReplyEmailRequest, ISendEmailRequest } from '@/types/smtp';
import { fetcher } from '../fetcher';
import { replyEmail, sendEmail } from './smtp';
import { auth, deleteMessage, getMessageByUid, getMessages } from './imap';
import { IGetMailsRequest } from '@/types/imap';

export const emailService = {
  auth: (email: string, password: string) => fetcher(() => auth(email, password)),
  sendEmail: (data: ISendEmailRequest) => fetcher(() => sendEmail(data)),
  replyEmail: (data: IReplyEmailRequest) => fetcher(() => replyEmail(data)),
  deleteEmail: (id: number) => fetcher(() => deleteMessage(id)),
  getMails: (options?: IGetMailsRequest) => fetcher(() => getMessages(options)),
  getMailByUid: (id: number) => fetcher(() => getMessageByUid(id))
};
