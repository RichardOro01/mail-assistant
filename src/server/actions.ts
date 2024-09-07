'use server';

import { SESSION_EXPIRES_DAYS } from '@/config';
import { addDays } from 'date-fns';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { refreshImapInstance, removeImapInstance } from './imap';

export const refreshSession = async () => {
  const sessionCookie = cookies().get('next-auth.session-token');
  const session = await getServerSession();
  if (sessionCookie && session && session.user && session.user.email) {
    cookies().set('next-auth.session-token', sessionCookie.value, {
      expires: addDays(new Date(), SESSION_EXPIRES_DAYS)
    });
    refreshImapInstance(session.user.email);
  }
};

export const removeImapSession = async () => {
  const session = await getServerSession();
  if (session && session.user && session.user.email) {
    removeImapInstance(session.user.email);
  }
};
