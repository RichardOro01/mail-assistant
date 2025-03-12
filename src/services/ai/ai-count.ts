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
      where: { user_id_ai_type: { user_id: session.user.id, ai_type: type } },
      update: { ai_count: { increment: 1 }, ai_last_use_date: new Date() },
      create: { user_id: session.user.id, ai_type: type, ai_count: 1, ai_last_use_date: new Date() }
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
      where: { user_id_ai_type: { user_id: session.user.id, ai_type: type } },
      select: { ai_count: true, ai_last_use_date: true }
    });
    if (currentUse) {
      if (
        isSameDay(
          new Date(currentUse.ai_last_use_date).toISOString().split('T')[0],
          new Date().toISOString().split('T')[0]
        )
      ) {
        if (currentUse.ai_count >= OPENAI_LIMITS_PER_DAY[type]) {
          throw {
            detail: { code: 'limit_exceded', message: 'The quota for this AI functionality has been exceded.' },
            status: 429,
            statusText: 'Limit exceded'
          } as FetchError<StandardError>;
        }
      } else {
        await prisma.ai_use_count.delete({ where: { user_id_ai_type: { user_id: session.user.id, ai_type: type } } });
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
