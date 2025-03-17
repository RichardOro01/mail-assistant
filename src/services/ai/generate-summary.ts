'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { createDataStreamResponse, generateId, streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { cleanText, removeLinkFromText } from './utils';
import { IMessageToSummary } from '@/types/ai';
import { validateMaxInputTokens } from '../email/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/auth/config';

export const generateSummary = async (message: IMessageToSummary) => {
  const session = await auth();
  if (!session || !session.user || !session.user.id) throw new Error('No session');

  const summaryFromBD = await prisma.message_summaries.findUnique({
    where: { user_id_message_uid: { user_id: session.user.id, message_uid: message.uid } },
    select: { summary: true }
  });

  if (summaryFromBD)
    return createDataStreamResponse({
      execute: (dataStream) => {
        dataStream.write(`f:{"messageId":"msg-${generateId()}"}\n`);
        dataStream.write(`0:"${cleanText(summaryFromBD.summary)}"\n`);
        dataStream.write(
          'e:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0},"isContinued":false}\n'
        );
      }
    });

  await verifyUserAICount('summary');

  const cleanMessage = removeLinkFromText(message.message);
  validateMaxInputTokens(cleanMessage, 'gpt-4o-mini', 2000);

  const stream = streamText({
    system: systems.generateSummary(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt: cleanMessage,
    onFinish: async ({ text }) => {
      await prisma.message_summaries.create({
        data: {
          user_id: session.user.id,
          message_uid: message.uid,
          summary: text
        }
      });
    }
  });

  sumUserAICount('summary');

  return stream.toDataStreamResponse();
};
