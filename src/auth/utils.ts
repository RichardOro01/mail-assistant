import { routes } from '@/lib/routes';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RETURN_TO_PARAM } from './context';
import { SESSION_EXPIRES_DAYS } from '@/config';

export const redirectToLogin = () => {
  const headersList = headers();
  const fullUrl = headersList.get('x-url') || '';
  const params = fullUrl ? `?${RETURN_TO_PARAM}=${fullUrl}` : '';
  redirect(`${routes.login}${params}`);
};

export const sessionExpiresTime = SESSION_EXPIRES_DAYS * 24 * 60 * 60;
export const sessionExpiresTimeMilliseconds = SESSION_EXPIRES_DAYS * 24 * 60 * 60 * 1000;
