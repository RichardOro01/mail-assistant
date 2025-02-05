'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const generateAnswer = async (prompt: string) =>
  streamText({
    system: systems.generateAnswer(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });
