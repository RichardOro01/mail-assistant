import { sessionExpiresTimeMilliseconds } from '@/auth/utils';
import { debugImap } from '@/lib/debug';
import { ImapFlowWithOptions } from '@/types/imap';
import { ImapFlow } from 'imapflow';
import { getServerSession } from 'next-auth';
import { Transporter } from 'nodemailer';

interface EmailInstance {
  expireTimer: NodeJS.Timeout;
  imap: ImapFlow;
  smtp: Transporter;
}

type EmailInstances = { [key: string]: EmailInstance };

const globalForEmailInstances = global as unknown as {
  emailInstances: EmailInstances;
};

if (!globalForEmailInstances.emailInstances) globalForEmailInstances.emailInstances = {};
const { emailInstances } = globalForEmailInstances;

export const hasEmailInstance = (email: string) => {
  debugImap('Checking if Imap instance exists \x1b[34m', email, email in emailInstances);
  return email in emailInstances;
};

export const addEmailInstance = (imap: ImapFlowWithOptions, smtp: Transporter) => {
  debugImap('Adding Email instance \x1b[34m', imap.options.auth.user);
  debugImap('Expires in \x1b[34m', sessionExpiresTimeMilliseconds, 'ms');
  const emailInstance: EmailInstance = {
    imap,
    smtp,
    expireTimer: setTimeout(() => {
      removeEmailInstance(imap.options.auth.user);
    }, sessionExpiresTimeMilliseconds)
  };
  emailInstances[imap.options.auth.user] = emailInstance;
};

export const refreshEmailInstance = (email: string) => {
  debugImap('Refreshing Imap instance \x1b[34m', email);
  debugImap('Expires in \x1b[34m', sessionExpiresTimeMilliseconds, 'ms');
  if (hasEmailInstance(email)) {
    clearTimeout(emailInstances[email].expireTimer);
    emailInstances[email].expireTimer = setTimeout(() => {
      removeEmailInstance(email);
    }, sessionExpiresTimeMilliseconds);
  }
};

export const removeEmailInstance = (email: string) => {
  debugImap('Removing Imap instance \x1b[34m', email);
  if (hasEmailInstance(email)) {
    emailInstances[email].imap.logout();
    emailInstances[email].smtp.close();
    delete emailInstances[email];
  }
};

export const getEmailInstance = async () => {
  debugImap('Getting IMAP instance');
  const session = await getServerSession();
  if (session && session.user && session.user.email && session.user.email in emailInstances) {
    debugImap('\x1b[32mIMAP instance success');
    return emailInstances[session.user.email];
  }
  debugImap('\x1b[33mNo IMAP instance');
  return null;
};
