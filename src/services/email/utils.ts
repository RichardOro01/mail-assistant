import { debugImap } from '@/lib/debug';
import { getEmailInstance } from '@/server/email';
import { FetchError, StandardError } from '../types';
import { ImapFlow } from 'imapflow';
import { checkEmail } from '@/server/utils';

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
