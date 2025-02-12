import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { useTranslationClient } from '@/i18n/client';
import MailSpeechToTextButtons from '../../speech-to-text/mail-speech-to-text-buttons';
import { Send, Wand2 } from 'lucide-react';

interface MailMessageComposeButtonsProps {
  speechToTexIsLoading: boolean;
  generateIsLoading: boolean;
  generateAnswer: () => void;
  generateStop: () => void;
  startRecording: () => void;
  stopRecording: () => void;
  isRecording: boolean;
}

const MailMessageReplyButtons: React.FC<MailMessageComposeButtonsProps> = ({
  speechToTexIsLoading,
  generateStop,
  generateAnswer,
  generateIsLoading,
  isRecording,
  startRecording,
  stopRecording
}) => {
  debugRendering('MailMessageReplyButtons');
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext();
  const { t } = useTranslationClient('message-reply');

  const handleSpeechToText = async () => {
    startRecording();
  };

  return (
    <div className='flex gap-4 items-center justify-between'>
      <div className='flex gap-4 items-center'>
        <MailSpeechToTextButtons
          disabled={generateIsLoading}
          isRecording={isRecording}
          speechToTexIsLoading={speechToTexIsLoading}
          stopRecording={stopRecording}
          handleSpeechToText={handleSpeechToText}
        />
        {!generateIsLoading ? (
          <Button
            type='button'
            variant='secondary'
            onClick={generateAnswer}
            disabled={speechToTexIsLoading || isRecording}>
            <Wand2 className='h-4 w-4' />
            <span className='hidden sm:inline'>{t('autocomplete')}</span>
          </Button>
        ) : (
          <Button type='button' variant='secondary' onClick={generateStop}>
            <Wand2 className='h-4 w-4' />
            <span className='hidden sm:inline'>{t('stop')}</span>
          </Button>
        )}
      </div>
      <Button
        className='font-semibold'
        type='submit'
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
        variant='secondary'>
        <Send className='h-4 w-4' />
        {t('send')}
      </Button>
    </div>
  );
};

export default MailMessageReplyButtons;
