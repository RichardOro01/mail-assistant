'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { removeLinkFromText } from './utils';
import { IMessageToSummary } from '@/types/ai';
import { validateMaxInputTokens } from '../email/validation';
import { prompts } from '@/lib/ai/prompts';

export const generateSummary = async (messages: IMessageToSummary[], limit: number) => {
  await verifyUserAICount('summary');

  const messagesString = prompts.generateSummary(messages, limit);

  const cleanMessages = removeLinkFromText(messagesString);
  validateMaxInputTokens(cleanMessages, 'gpt-4o-mini', 2000);

  const stream = streamText({
    system: systems.generateSummary(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt: cleanMessages
  });

  sumUserAICount('summary');

  return stream;
};
