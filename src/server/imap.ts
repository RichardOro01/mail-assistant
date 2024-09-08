import { NEXT_MAIL_SERVER_HOST, NEXT_IMAP_MAIL_SERVER_PORT } from '@/config';
import { debugImap } from '@/lib/debug';
import Imap from 'imap';

export const createImapInstance = (email: string, password: string) => {
  debugImap('Creating Imap instance \x1b[34m', email);
  const imap = new Imap({
    user: email,
    password: password,
    host: NEXT_MAIL_SERVER_HOST,
    port: Number(NEXT_IMAP_MAIL_SERVER_PORT) || 993,
    tls: true
  });
  debugImap('\x1b[32mImap instance created \x1b[34m', email);
  return imap;
};
