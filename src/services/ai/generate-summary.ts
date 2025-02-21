'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { removeLinkFromText } from './utils';
import { IMessageToSummary } from '@/types/ai';

export const generateSummary = async (messages: IMessageToSummary[], limit: number) => {
  await verifyUserAICount('summary');

  let messagesString = '';
  for (let i = 0; i < messages.length && i < limit; i++) {
    const message = messages[i];
    messagesString += `Message ${i}\n`;
    messagesString += `from: ${message.sendBy}\n`;
    messagesString += `text: ${message.message}\n`;
  }

  const cleanMessages = removeLinkFromText(messagesString);

  const stream = streamText({
    system: systems.generateSummary(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt: cleanMessages
  });

  sumUserAICount('summary');

  return stream;
};
