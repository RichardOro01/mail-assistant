'use server';

import { createImapInstance } from '@/server/imap';
import { debugImap } from '../../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { EmailInstance, addEmailInstance, updateEmailCurrentFetching } from '@/server/email';
import { FetchError, FetchOkResponse, StandardError } from '../types';
import { isObjectWithProperties } from '@/lib/utils';
import { FetchMessageObject, ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { emailAdapter } from '@/server/adapters';
import { IGetMailsRequest, IMessage } from '@/types/imap';
import { createImapConnection, findPlainTextPart, streamToString, verifyImapFetching } from './utils';
import { IPaginatedData } from '@/types/pagination';
import quotedPrintable from 'quoted-printable';

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
  let fetchedMessages: FetchMessageObject[] = [];

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

    debugImap(`Fetching ${reverseList.length} messages`);
    await verifyImapFetching(thisFetching);
    fetchedMessages = await connection.fetchAll(reverseList, {
      uid: true,
      envelope: true,
      bodyStructure: true,
      bodyParts: ['1', '1.1']
    });
    debugImap('Fetched messages', fetchedMessages.length);
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

  for (const msg of fetchedMessages) {
    let textoPlano = '';
    let type = msg.bodyStructure.childNodes?.[0]?.type;
    if (type?.includes('multipart')) type = msg.bodyStructure.childNodes?.[0]?.childNodes?.[0]?.type;
    if (type && !type?.includes('plain')) {
      const partId = findPlainTextPart(msg.bodyStructure);
      if (partId) {
        debugImap('New mail lock', msg.uid);
        const lock2 = await connection.getMailboxLock('INBOX');
        try {
          debugImap('Downloading message', msg.uid);
          const { content } = await connection.download(String(msg.uid), partId, { uid: true });

          debugImap('Reading message', msg.uid);
          textoPlano = await streamToString(content);
        } finally {
          lock2.release();
        }
      }
    } else {
      const decodedBinary = quotedPrintable
        .decode((msg.bodyParts.get('1.1') || msg.bodyParts.get('1'))?.toString() || '')
        .replaceAll('*', '"');
      const buffer = Buffer.from(decodedBinary, 'binary');
      textoPlano = buffer.toString('utf-8');
    }

    messages.push({
      from: msg.envelope.from[0],
      subject: msg.envelope.subject,
      date: msg.envelope.date,
      text: textoPlano,
      uid: Number(msg.uid),
      to: msg.envelope.to
    });
  }
  connection.logout();

  debugImap('Returning messages');
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
