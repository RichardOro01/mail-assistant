'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { IGenerateMessageRequest } from '@/types/ai';
import { prompts } from '@/lib/ai/prompts';

export const generateAnswer = async (data: IGenerateMessageRequest) => {
  await verifyUserAICount('generate_answer');

  const stream = streamText({
    system: systems.generateAnswer(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt: prompts.generateAnswer(data)
  });

  sumUserAICount('generate_answer');

  return stream;
};
