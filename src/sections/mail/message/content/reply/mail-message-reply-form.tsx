import React, { useCallback, useEffect } from 'react';
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

interface MailMessageReplyFormProps {
  hidden: boolean;
}

const MailMessageReplyForm: React.FC<MailMessageReplyFormProps> = ({ hidden }) => {
  const { setValue, getValues, trigger } = useFormContext<IReplyEmailForm>();
  const { selectedMail } = useMailContext();
  const { t } = useTranslationClient('message-reply');
  const { handleStandardError } = useHandleError();

  const onFinish = () => {
    trigger('text');
  };

  const { generateTextFromAudio, isLoading: speechToTexIsLoading } = useSpeechToTextAI();

  const {
    completion: generateCompletion,
    complete: generateComplete,
    isLoading: generateIsLoading,
    stop: generateStop
  } = useGenerateAnswerAI({ onFinish });

  const handleRecord = useCallback(
    async (audio: Blob) => {
      try {
        const text = await generateTextFromAudio(audio);
        if (text) {
          const currentTextValue = getValues('text');
          setValue('text', `${currentTextValue} ${text}`);
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
          placeholder='To'
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
        />
      </div>
      <FormTextarea
        autoSize
        name='text'
        className='w-full text-lg font-medium  bg-transparent resize-none overflow-hidden'
        rows={5}
        placeholder={generateIsLoading ? t('thinking') : isRecording || speechToTexIsLoading ? t('hearing') : ''}
        disabled={generateIsLoading || speechToTexIsLoading || isRecording}
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
