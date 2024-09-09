import { endpoints } from '@/lib/endpoints';
import { UseCompletionOptions } from '@ai-sdk/ui-utils';
import { useCompletion } from 'ai/react';

export const useSummaryAI = (options?: UseCompletionOptions | undefined) => {
  const { complete: oldComplete, ...rest } = useCompletion({
    api: endpoints.ai.generateSummary,
    ...options
  });

  const complete = (messages: string[]) => {
    return oldComplete('', { body: { messages } });
  };

  return { complete, ...rest };
};

export const useGenerateAnswerAI = (options?: UseCompletionOptions | undefined) => {
  const methods = useCompletion({
    api: endpoints.ai.generateAnswer,
    ...options
  });

  return methods;
};
