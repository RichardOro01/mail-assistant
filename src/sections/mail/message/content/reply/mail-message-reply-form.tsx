import React, { useCallback, useEffect, useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FormTextarea from '@/components/form-hook/form-textarea';
import MailMessageReplyButtons from './mail-message-reply-buttons';
import { useMailContext } from '@/sections/mail/provider/hooks';
import { useFormContext } from 'react-hook-form';
import { IReplyEmailForm } from '@/types/smtp';
import { useGenerateAnswerAI, useSpeechToTextAI } from '@/services/hooks';
import { useTranslationClient } from '@/i18n/client';
import FormInput from '@/components/form-hook/form-input';
import { Label } from '@/components/ui/label';
import { useAudioRecord } from '@/lib/audio/use-audio-record';
import { useHandleError } from '@/lib/error/hooks';
import clsx from 'clsx';
import { EMAIL_TEXT_LIMIT, EMAIL_TO_LIMIT } from '@/services/email/validation-consts';

interface MailMessageReplyFormProps {
  hidden: boolean;
}

const MailMessageReplyForm: React.FC<MailMessageReplyFormProps> = ({ hidden }) => {
  const { setValue, getValues, trigger } = useFormContext<IReplyEmailForm>();
  const { selectedMail } = useMailContext();
  const { t } = useTranslationClient('message-reply');
  const { handleStandardError } = useHandleError();
  const [showError, setShowError] = useState(false);

  const onFinish = () => {
    trigger('text');
  };

  const onResponse = async (res: Response) => {
    if (res.status >= 400) {
      handleStandardError(await res.json(), { showToast: true, directDetail: true });
    } else {
      setShowError(true);
    }
  };
  const { generateTextFromAudio, isLoading: speechToTexIsLoading } = useSpeechToTextAI();

  const {
    completion: generateCompletion,
    complete: generateComplete,
    isLoading: generateIsLoading,
    stop: generateStop,
    error: generateError
  } = useGenerateAnswerAI({ onFinish, onResponse });

  useEffect(() => {
    if (generateError && showError) {
      setShowError(false);
      handleStandardError(generateError, { showToast: true });
    }
  }, [showError, generateError, handleStandardError]);

  const handleRecord = useCallback(
    async (audio: Blob) => {
      try {
        const text = await generateTextFromAudio(audio);
        if (text) {
          const currentTextValue = getValues('text');
          setValue('text', `${currentTextValue} ${text}`, { shouldValidate: true });
        }
      } catch (e) {
        handleStandardError(e, { showToast: true });
      }
    },
    [generateTextFromAudio, getValues, handleStandardError, setValue]
  );

  const { isRecording, startRecording, stopRecording } = useAudioRecord({ onRecord: handleRecord });

  const generateAnswer = () => {
    if (selectedMail && selectedMail.text)
      generateComplete({
        message: selectedMail.text,
        answer: getValues('text'),
        sendBy: selectedMail.from.name || selectedMail.from.address || 'unknown'
      });
  };

  useEffect(() => {
    setValue('text', generateCompletion);
  }, [generateCompletion, setValue]);

  debugRendering('MailMessageReplyForm');
  return (
    <div
      className={clsx('flex flex-col gap-4 py-2 transition-all', {
        hidden
      })}>
      <div className='flex items-center gap-4 mb-4'>
        <Label className=''>{t('to')}</Label>
        <FormInput
          name='to'
          placeholder='pepe@avangenio.com'
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
          maxLength={EMAIL_TO_LIMIT}
        />
      </div>
      <FormTextarea
        autoSize
        name='text'
        className='w-full text-lg font-medium  bg-transparent resize-none overflow-hidden'
        rows={5}
        placeholder={generateIsLoading ? t('thinking') : isRecording || speechToTexIsLoading ? '...' : ''}
        disabled={generateIsLoading || speechToTexIsLoading || isRecording}
        maxLength={EMAIL_TEXT_LIMIT}
      />
      <MailMessageReplyButtons
        {...{
          speechToTexIsLoading,
          generateStop,
          generateAnswer,
          generateIsLoading,
          isRecording,
          startRecording,
          stopRecording
        }}
      />
    </div>
  );
};

export default MailMessageReplyForm;
