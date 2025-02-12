'use server';

import { systems } from '@/lib/ai/system';
import { MessagePriorityType } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';

//TODO use generate structure data

export const getMessagePriority = async (prompt: string): Promise<MessagePriorityType> => {
  await verifyUserAICount('priority');

  const { text } = await generateText({
    system: systems.getMessagePriority(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });

  sumUserAICount('priority');

  return extractPriorityValue(text);
};

const extractPriorityValue = (value: string): MessagePriorityType => {
  if (value.toLowerCase().includes('high')) return 'high';
  if (value.toLowerCase().includes('medium')) return 'medium';
  if (value.toLowerCase().includes('low')) return 'low';
  return 'none';
};
