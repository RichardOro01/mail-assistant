import { endpoints } from '@/lib/endpoints';
import { UseCompletionOptions } from '@ai-sdk/ui-utils';
import { useCompletion } from 'ai/react';
// import { useCallback, useState } from 'react';

export const useSummaryAI = (options?: UseCompletionOptions) => {
  const { complete: oldComplete, ...rest } = useCompletion({
    api: endpoints.ai.generateSummary,
    ...options
  });

  const complete = (messages: string[]) => {
    return oldComplete('', { body: { messages } });
  };

  return { complete, ...rest };
};

export const useGenerateAnswerAI = (options?: UseCompletionOptions) => {
  const methods = useCompletion({
    api: endpoints.ai.generateAnswer,
    ...options
  });

  return methods;
};
