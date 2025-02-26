'use server';

import { systems } from '@/lib/ai/system';
import { MessagePriorityType } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { z } from 'zod';
import { removeLinkFromText } from './utils';
import { validateMaxInputTokens } from '../email/validation';

export const getMessagePriority = async (prompt: string): Promise<MessagePriorityType> => {
  await verifyUserAICount('priority');

  prompt = removeLinkFromText(prompt);
  validateMaxInputTokens(prompt, 'gpt-4o-mini', 2000);

  const {
    object: { priority }
  } = await generateObject({
    system: systems.getMessagePriority(),
    model: openai('gpt-4o-mini'),
    maxTokens: 50,
    prompt,
    schema: z.object({
      priority: z.enum(['high', 'medium', 'low'])
    })
  });

  sumUserAICount('priority');

  return priority;
};
