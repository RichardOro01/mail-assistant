'use server';

import { systems } from '@/lib/ai/system';
import { MessagePriorityType } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { z } from 'zod';
import { removeLinkFromText } from './utils';

export const getMessagePriority = async (prompt: string): Promise<MessagePriorityType> => {
  await verifyUserAICount('priority');

  prompt = removeLinkFromText(prompt);

  const {
    object: { priority }
  } = await generateObject({
    system: systems.getMessagePriority(),
    model: openai('gpt-4o-mini'),
    maxTokens: 2000,
    prompt,
    schema: z.object({
      priority: z.enum(['high', 'medium', 'low'])
    })
  });

  sumUserAICount('priority');

  return priority;
};
