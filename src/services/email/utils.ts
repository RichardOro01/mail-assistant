import { debugImap } from '@/lib/debug';
import { getEmailCurrentFetching, getEmailInstance } from '@/server/email';
import { FetchError, StandardError } from '../types';
import { ImapFlow, MessageStructureObject } from 'imapflow';
import { checkEmail } from '@/server/utils';
import internal from 'stream';

export const createImapConnection = async () => {
  debugImap('Creating IMAP connection');
  await checkEmail();
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
    debugImap('Connecting to IMAP');
    connection = await imap.connect();
    debugImap('Connected to IMAP');
  } catch (error) {
    console.log(error);
    throw {
      detail: { code: 'imap_connect_error', message: 'Something went wrong.' },
      status: 500,
      statusText: 'Internal Server Error.'
    } as FetchError<StandardError>;
  }
  return connection;
};

export const findPlainTextPart = (structure: MessageStructureObject): string | undefined => {
  //TODO recursive
  for (const child of structure.childNodes) {
    if (child.type === 'text/plain') {
      return child.part;
    }
  }
};

export const streamToString = async (stream: internal.Readable) => {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
};
export const verifyImapFetching = async (fetching: number) => {
  const currentFetching = await getEmailCurrentFetching();
  if (fetching !== currentFetching) throw new Error('Abort by other fetching');
};
