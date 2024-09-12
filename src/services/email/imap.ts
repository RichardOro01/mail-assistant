'use server';

import { createImapInstance } from '@/server/imap';
import { debugImap } from '../../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { EmailInstance, addEmailInstance } from '@/server/email';
import { FetchError, FetchOkResponse, StandardError } from '../types';
import { isObjectWithProperties } from '@/lib/utils';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { emailAdapter } from '@/server/adapters';
import { IMessage } from '@/types/imap';
import { createImapConnection } from './utils';

export const auth = async (email: string, password: string) => {
  try {
    const imap = createImapInstance(email, password);
    debugImap('Imap connecting \x1b[34m', email);
    const connection = await imap.connect();
    debugImap('Imap open \x1b[34m', email);
    await connection.logout();
    const smtp = createSmtpInstance(email, password);
    const emailInstance = addEmailInstance(imap, smtp);
    return { data: emailInstance, status: 200, statusText: 'OK.' } as FetchOkResponse<EmailInstance>;
  } catch (error) {
    if (isObjectWithProperties(error, ['authenticationFailed']) && error.authenticationFailed)
      return {
        detail: { code: 'invalid_credentials', message: 'Invalid Credentials.' },
        status: 401,
        statusText: 'Invalid Credentials.'
      } as FetchError<StandardError>;
    else {
      console.log(error);
      return {
        detail: { code: 'unknown', message: 'Something wen wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
  }
};
export const getMessages = async (search?: string) => {
  debugImap('Getting messages');
  const messages: IMessage[] = [];

  let connection: ImapFlow;
  try {
    connection = await createImapConnection();
  } catch (error) {
    return error as FetchError<StandardError>;
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
    return {
      detail: { code: 'unknown', message: 'Something wen wrong.' },
      status: 500,
      statusText: 'Internal Server Error.'
    } as FetchError<StandardError>;
  } finally {
    lock.release();
  }
  await connection.logout();
  return { data: messages, status: 200, statusText: 'OK.' } as FetchOkResponse<IMessage[]>;
};
export const getMessageByUid = async (uid: number) => {
  let message: IMessage;
  let connection: ImapFlow;
  try {
    connection = await createImapConnection();
  } catch (error) {
    return error as FetchError<StandardError>;
  }
  const lock = await connection.getMailboxLock('INBOX');
  try {
    debugImap('Fetching message', uid);
    const messageFetch = await connection.fetchOne(`${uid}`, { source: true });
    const parsed = await simpleParser(messageFetch.source);

    message = emailAdapter(parsed, messageFetch);
  } catch (error) {
    console.log(error);
    return {
      detail: { code: 'unknown', message: 'Something wen wrong.' },
      status: 500,
      statusText: 'Internal Server Error.'
    } as FetchError<StandardError>;
  } finally {
    lock.release();
  }
  await connection.logout();
  return { data: message, status: 200, statusText: 'OK.' } as FetchOkResponse<IMessage>;
};
export const deleteMessage = async (uid: number) => {
  let connection: ImapFlow;
  try {
    connection = await createImapConnection();
  } catch (error) {
    return error as FetchError<StandardError>;
  }
  const lock = await connection.getMailboxLock('INBOX');
  try {
    debugImap('Deleting message', uid);
    await connection.messageDelete(`${uid}`, { uid: true });
  } catch (error) {
    console.log(error);
    return {
      detail: { code: 'unknown', message: 'Something wen wrong.' },
      status: 500,
      statusText: 'Internal Server Error.'
    } as FetchError<StandardError>;
  } finally {
    lock.release();
  }
  await connection.logout();
  return { data: { ok: true }, status: 200, statusText: 'OK' } as FetchOkResponse<{ ok: true }>;
};
