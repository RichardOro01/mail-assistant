'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const getMessagePriority = async (prompt: string) =>
  generateText({
    system: systems.getMessagePriority(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });
