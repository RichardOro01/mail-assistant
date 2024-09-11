import { NEXT_MAIL_SERVER_HOST, NEXT_IMAP_MAIL_SERVER_PORT } from '@/config';
import { debugImap } from '@/lib/debug';
import { ImapFlow } from 'imapflow';

export const createImapInstance = (email: string, password: string) => {
  debugImap('Creating Imap instance \x1b[34m', email);
  const imap = new ImapFlow({
    host: NEXT_MAIL_SERVER_HOST,
    port: NEXT_IMAP_MAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: email,
      pass: password
    }
  });

  debugImap('\x1b[32mImap instance created \x1b[34m', email);
  return imap;
};
