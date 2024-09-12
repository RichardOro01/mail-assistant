import { createImapInstance } from '@/server/imap';
import { debugImap } from '../../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { addEmailInstance, getEmailInstance } from '@/server/email';
import { FetchError, StandardError } from '../types';
import { isObjectWithProperties } from '@/lib/utils';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { emailAdapter } from '@/server/adapters';
import { IMessage } from '@/types/imap';

export const imapService = {
  auth: async (email: string, password: string) => {
    try {
      const imap = createImapInstance(email, password);
      debugImap('Imap connecting \x1b[34m', email);
      const connection = await imap.connect();
      debugImap('Imap open \x1b[34m', email);
      await connection.logout();
      const smtp = createSmtpInstance(email, password);
      const emailInstance = addEmailInstance(imap, smtp);
      return emailInstance;
    } catch (error) {
      if (isObjectWithProperties(error, ['authenticationFailed']) && error.authenticationFailed)
        throw {
          detail: { code: 'invalid_credentials', message: 'Invalid Credentials.' },
          status: 401,
          statusText: 'Invalid Credentials.'
        } as FetchError<StandardError>;
      else {
        console.log(error);
        throw {
          detail: { code: 'unknown', message: 'Something wen wrong.' },
          status: 500,
          statusText: 'Internal Server Error.'
        } as FetchError<StandardError>;
      }
    }
  },
  getMessages: async (search?: string) => {
    debugImap('Getting messages');
    const messages: IMessage[] = [];
    const email = await getEmailInstance();
    if (!email) {
      debugImap('\x1b[31mRejecting cause no email instance');
      throw {
        detail: { code: 'email_instance_not_found', message: 'No email instance' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const { imap } = email;
    let connection: ImapFlow;
    try {
      connection = await imap.connect();
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'imap_connect_error', message: 'Something went wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const lock = await connection.getMailboxLock('INBOX');
    try {
      debugImap('Searching', search);
      const list = (await connection.search({ ...(search ? { body: search } : {}) })) || [];
      const reverseList = list.reverse().slice(0, 20);

      debugImap('Fetching messages');
      for await (const message of connection.fetch(reverseList, {
        source: true
      })) {
        const parsed = await simpleParser(message.source);
        messages.push(emailAdapter(parsed, message));
      }
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'unknown', message: 'Something wen wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    } finally {
      lock.release();
    }
    await connection.logout();
    return messages;
  },
  getMessageByUid: async (uid: number) => {
    const email = await getEmailInstance();
    let message: IMessage;
    if (!email) {
      debugImap('\x1b[31mRejecting cause no IMAP instance');
      throw {
        detail: { code: 'imap_instance_not_found', message: 'No imap instance' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const { imap } = email;
    let connection: ImapFlow;
    try {
      connection = await imap.connect();
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'imap_connect_error', message: 'Something went wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const lock = await connection.getMailboxLock('INBOX');
    try {
      debugImap('Fetching message', uid);
      const messageFetch = await connection.fetchOne(`${uid}`, { source: true });
      const parsed = await simpleParser(messageFetch.source);

      message = emailAdapter(parsed, messageFetch);
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'unknown', message: 'Something wen wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    } finally {
      lock.release();
    }
    await connection.logout();
    return message;
  }
};
