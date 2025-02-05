'use server';

import { systems } from '@/lib/ai/system';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const generateSummary = async (messages: string[], limit: number) => {
  let messagesString = '';
  for (let i = 0; i < messages.length && i < limit; i++) {
    const message = messages[i];
    messagesString += `Message ${i}\n`;
    messagesString += `${message}\n`;
  }

  return streamText({
    system: systems.generateSummary(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt: messagesString
  });
};
