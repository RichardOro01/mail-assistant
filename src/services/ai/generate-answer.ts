'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { IGenerateMessageRequest } from '@/types/ai';
import { prompts } from '@/lib/ai/prompts';
import { removeLinkFromText } from './utils';
import { validateMaxInputTokens } from '../email/validation';

export const generateAnswer = async (data: IGenerateMessageRequest) => {
  await verifyUserAICount('generate_answer');

  data.message = removeLinkFromText(data.message);
  validateMaxInputTokens(data.message, 'gpt-4o-mini', 2000);

  const stream = streamText({
    system: systems.generateAnswer(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt: prompts.generateAnswer(data)
  });

  sumUserAICount('generate_answer');

  return stream;
};
