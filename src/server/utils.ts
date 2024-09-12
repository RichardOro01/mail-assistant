import { debugImap } from '@/lib/debug';
import { FetchError, StandardError } from '@/services/types';
import { getServerSession } from 'next-auth';

export const checkEmail = async () => {
  debugImap('Checking email');
  debugImap('Getting session from server');
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) {
    debugImap('\x1b[31mNo email from server');
    throw {
      status: 401,
      detail: {
        code: 'unauthorized',
        message: 'Unauthorized request.'
      },
      statusText: 'Unauthorized'
    } as FetchError<StandardError>;
  }
  debugImap('\x1b[32mEmail check successfully');
  return true;
};
