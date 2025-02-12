import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { useTranslationClient } from '@/i18n/client';
import { Send } from 'lucide-react';
import MailSpeechToTextButtons from '../speech-to-text/mail-speech-to-text-buttons';
import { useAudioRecord } from '@/lib/audio/use-audio-record';

interface MailMessageComposeButtonsProps {
  handleRecord: (audio: Blob) => void;
  speechToTexIsLoading: boolean;
}

const MailMessageComposeButtons: React.FC<MailMessageComposeButtonsProps> = ({
  handleRecord,
  speechToTexIsLoading
}) => {
  debugRendering('MailMessageComposeButtons');
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext();
  const { t } = useTranslationClient('message-compose');

  const { isRecording, startRecording, stopRecording } = useAudioRecord({ onRecord: handleRecord });

  const handleSpeechToText = async () => {
    startRecording();
  };

  return (
    <div className='flex w-full gap-4 justify-between'>
      <MailSpeechToTextButtons
        handleSpeechToText={handleSpeechToText}
        stopRecording={stopRecording}
        isRecording={isRecording}
        speechToTexIsLoading={speechToTexIsLoading}
      />
      <Button
        className='font-semibold'
        type='submit'
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
        variant='secondary'>
        <Send className='mr-2 h-4 w-4' />
        {t('send')}
      </Button>
    </div>
  );
};

export default MailMessageComposeButtons;
