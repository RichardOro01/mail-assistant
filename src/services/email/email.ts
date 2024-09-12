import { checkEmail } from '../../server/utils';
import { debugImap } from '@/lib/debug';
import { imapService } from './imap';

const getMessages = async () => {
  await checkEmail();
  const messages = await imapService.getMessages();
  debugImap(`\x1b[32mSuccess (${messages.length} messages)`);
  return messages;
};

const getEmailByUid = async (id: number) => {
  await checkEmail();
  const message = await imapService.getMessageByUid(id);
  debugImap('\x1b[32mMessage found)');
  return message;
};

const auth = (email: string, password: string) => {
  return imapService.auth(email, password);
};

export const emailServiceBackend = {
  auth,
  getMessages,
  getEmailByUid
};
