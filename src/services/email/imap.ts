'use server';

import { createImapInstance } from '@/server/imap';
import { debugImap } from '../../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { EmailInstance, addEmailInstance, updateEmailCurrentFetching } from '@/server/email';
import { FetchError, FetchOkResponse, StandardError } from '../types';
import { isObjectWithProperties } from '@/lib/utils';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { emailAdapter } from '@/server/adapters';
import { IGetMailsRequest, IMessage } from '@/types/imap';
import { createImapConnection, verifyImapFetching } from './utils';
import { IPaginatedData } from '@/types/pagination';

export const auth = async (email: string, password: string) => {
  try {
    const imap = createImapInstance(email, password);
    debugImap('Imap connecting \x1b[34m', email);
    const connection = await imap.connect();
    debugImap('Imap open \x1b[34m', email);
    connection.logout();
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
export const getMessages = async (options?: IGetMailsRequest) => {
  debugImap('Getting messages');

  const search = options?.search;
  const limit = options?.limit || 20;
  const page = options?.page || 1;

  const messages: IMessage[] = [];

  let connection: ImapFlow;
  try {
    connection = await createImapConnection();
  } catch (error) {
    return error as FetchError<StandardError>;
  }
  let totalPages: number;
  debugImap('Getting Mailbox Lock');
  const lock = await connection.getMailboxLock('INBOX');
  try {
    debugImap('Searching:\x1b[33m', search);
    const thisFetching = await updateEmailCurrentFetching();
    const list = (await connection.search({ ...(search ? { body: search } : {}) })) || [];
    totalPages = Math.ceil(list.length / limit) || 1;
    const reverseList = list.reverse().slice((page - 1) * limit, page * limit);
    debugImap('Updating fetching');
    debugImap(`Fetching ${reverseList.length} messages`);
    let current = 0;

    await verifyImapFetching(thisFetching);
    const resMessages = await connection.fetchAll(reverseList, { source: true });

    await verifyImapFetching(thisFetching);
    for (const message of resMessages) {
      const parsed = await simpleParser(message.source);
      messages.push(emailAdapter(parsed, message));
      debugImap(`Status: ${((++current / reverseList.length) * 100).toFixed()}%`);
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
  connection.logout();
  return {
    data: { items: messages, totalPages },
    status: 200,
    statusText: 'OK.'
  } as FetchOkResponse<IPaginatedData<IMessage>>;
};
export const getMessageByUid = async (uid: number) => {
  let message: IMessage;
  let connection: ImapFlow;
  const thisFetching = await updateEmailCurrentFetching();
  try {
    connection = await createImapConnection();
  } catch (error) {
    return error as FetchError<StandardError>;
  }
  await verifyImapFetching(thisFetching);
  const lock = await connection.getMailboxLock('INBOX');
  try {
    await verifyImapFetching(thisFetching);
    debugImap('Fetching message', uid);
    const messageFetch = await connection.fetchOne(`${uid}`, { source: true }, { uid: true });

    debugImap('Parsing message', uid);
    const parsed = await simpleParser(messageFetch.source);

    debugImap('Parsed message', uid);
    message = emailAdapter(parsed, messageFetch);
  } catch (error) {
    console.log(error);
    return {
      detail: { code: 'unknown', message: 'Something went wrong.' },
      status: 500,
      statusText: 'Internal Server Error.'
    } as FetchError<StandardError>;
  } finally {
    lock.release();
  }
  connection.logout();
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
  connection.logout();
  return { data: { ok: true }, status: 200, statusText: 'OK' } as FetchOkResponse<{ ok: true }>;
};
