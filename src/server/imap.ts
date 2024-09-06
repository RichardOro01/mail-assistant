import { sessionExpiresTimeMilliseconds } from '@/auth/utils';
import { NEXT_MAIL_SERVER_HOST, NEXT_IMAP_MAIL_SERVER_PORT } from '@/config';
import { debugImap } from '@/lib/debug';
import { ImapWithConfig } from '@/types/imap';
import Imap from 'imap';
import { getServerSession } from 'next-auth';

interface ImapInstance {
  expireTimer: NodeJS.Timeout;
  imap: Imap;
}

type ImapInstances = { [key: string]: ImapInstance };

const globalForImapInstances = global as unknown as {
  imapInstances: ImapInstances;
};

if (!globalForImapInstances.imapInstances) globalForImapInstances.imapInstances = {};
const { imapInstances } = globalForImapInstances;

export const hasImapInstance = (email: string) => {
  debugImap('Checking if Imap instance exists \x1b[34m', email, email in imapInstances);
  return email in imapInstances;
};

export const addImapInstance = (imap: ImapWithConfig) => {
  debugImap('Adding Imap instance \x1b[34m', imap._config.user);
  debugImap('Expires in \x1b[34m', sessionExpiresTimeMilliseconds, 'ms');
  const imapInstance: ImapInstance = {
    imap,
    expireTimer: setTimeout(() => {
      removeImapInstance(imap._config.user);
    }, sessionExpiresTimeMilliseconds)
  };
  imapInstances[imap._config.user] = imapInstance;
};

export const refreshImapInstance = (email: string) => {
  debugImap('Refreshing Imap instance \x1b[34m', email);
  debugImap('Expires in \x1b[34m', sessionExpiresTimeMilliseconds, 'ms');
  if (hasImapInstance(email)) {
    clearTimeout(imapInstances[email].expireTimer);
    imapInstances[email].expireTimer = setTimeout(() => {
      removeImapInstance(email);
    }, sessionExpiresTimeMilliseconds);
  }
};

export const removeImapInstance = (email: string) => {
  debugImap('Removing Imap instance \x1b[34m', email);
  if (hasImapInstance(email)) {
    imapInstances[email].imap.end();
    delete imapInstances[email];
  }
};

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

export const getImapInstance = async () => {
  debugImap('Getting IMAP instance');
  const session = await getServerSession();
  if (session && session.user && session.user.email && session.user.email in imapInstances) {
    debugImap('\x1b[32mIMAP instance success');
    return imapInstances[session.user.email].imap;
  }
  debugImap('\x1b[33mNo IMAP instance');
  return null;
};
