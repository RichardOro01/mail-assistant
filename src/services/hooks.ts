import { endpoints } from '@/lib/endpoints';
import { UseCompletionOptions } from '@ai-sdk/ui-utils';
import { useCompletion } from 'ai/react';
import { useCallback, useState } from 'react';
import { useHandleError } from '@/lib/error/hooks';
import { handleFetchAPIResponse } from './fetcher';
import { ISpeechToTextResponse, ITextToSpeechRequest } from '@/types/ai';

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

export const useSpeechToTextAI = () => {
  const { handleStandardError } = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const generateTextFromAudio = useCallback(
    async (audio: Blob) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('audio', audio, 'audio.webm');
        const res = await fetch(endpoints.ai.speechToText, { method: 'POST', body: formData });
        const handledRes = await handleFetchAPIResponse<ISpeechToTextResponse>(res);
        return handledRes.data.text;
      } catch (e) {
        handleStandardError(e, { showToast: true });
      } finally {
        setIsLoading(false);
      }
    },
    [handleStandardError]
  );

  return { generateTextFromAudio, isLoading };
};

export const useTextToSpeechAI = () => {
  const { handleStandardError } = useHandleError();
  const [isLoading, setIsLoading] = useState(false);

  const generateAudioFromText = useCallback(
    async (text: string) => {
      try {
        setIsLoading(true);
        const body: ITextToSpeechRequest = { text };
        const res = await fetch(endpoints.ai.textToSpeech, { method: 'POST', body: JSON.stringify(body) });
        const blob = await res.blob();
        return blob;
      } catch (e) {
        handleStandardError(e, { showToast: true });
      } finally {
        setIsLoading(false);
      }
    },
    [handleStandardError]
  );

  return { generateAudioFromText, isLoading };
};
