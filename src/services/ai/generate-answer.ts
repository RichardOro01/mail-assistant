'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';

export const generateAnswer = async (prompt: string) => {
  await verifyUserAICount('generate_answer');

  const stream = streamText({
    system: systems.generateAnswer(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });

  sumUserAICount('generate_answer');

  return stream;
};
