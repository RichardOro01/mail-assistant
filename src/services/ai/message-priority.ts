'use server';

import { systems } from '@/lib/ai/system';
import { MessagePriorityType } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

export const getMessagePriority = async (prompt: string): Promise<MessagePriorityType> => {
  const { text } = await generateText({
    system: systems.getMessagePriority(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });

  return extractPriorityValue(text);
};

const extractPriorityValue = (value: string): MessagePriorityType => {
  if (value.toLowerCase().includes('high')) return 'high';
  if (value.toLowerCase().includes('medium')) return 'medium';
  if (value.toLowerCase().includes('low')) return 'low';
  return 'none';
};
