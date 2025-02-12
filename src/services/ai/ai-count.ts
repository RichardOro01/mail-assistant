import { auth } from '@/auth/config';
import prisma from '@/lib/prisma';
import { ai_use_type } from '@prisma/client';
import { FetchError, StandardError } from '../types';
import { isSameDay } from 'date-fns';
import { OPENAI_LIMITS_PER_DAY } from '@/config';

export const sumUserAICount = async (type: ai_use_type) => {
  const session = await auth();
  if (session && session.user && session.user.email) {
    await prisma.ai_use_count.upsert({
      where: { user_id_type: { user_id: session.user.id, type } },
      update: { count: { increment: 1 }, last_use_date: new Date() },
      create: { user_id: session.user.id, type, count: 1, last_use_date: new Date() }
    });
  } else {
    throw {
      detail: { code: 'unauthorized', message: 'Unauthorized request.' },
      status: 401,
      statusText: 'Unauthorized'
    } as FetchError<StandardError>;
  }
};

export const verifyUserAICount = async (type: ai_use_type) => {
  const session = await auth();
  if (session && session.user && session.user.email) {
    const currentUse = await prisma.ai_use_count.findUnique({
      where: { user_id_type: { user_id: session.user.id, type } },
      select: { count: true, last_use_date: true }
    });
    if (currentUse) {
      if (
        isSameDay(
          new Date(currentUse.last_use_date).toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        )
      ) {
        if (currentUse.count >= OPENAI_LIMITS_PER_DAY[type]) {
          throw {
            detail: { code: 'limit_exceded', message: 'The quota for this AI functionality has been exceded.' },
            status: 429,
            statusText: 'Limit exceded'
          } as FetchError<StandardError>;
        }
      } else {
        await prisma.ai_use_count.delete({ where: { user_id_type: { user_id: session.user.id, type } } });
      }
    }
    return true;
  } else {
    throw {
      detail: { code: 'unauthorized', message: 'Unauthorized request.' },
      status: 401,
      statusText: 'Unauthorized'
    } as FetchError<StandardError>;
  }
};
