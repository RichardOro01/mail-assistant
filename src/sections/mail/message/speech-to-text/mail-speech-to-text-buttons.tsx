import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';

interface MailSpeechToTextButtonsProps {
  disabled?: boolean;
  isRecording: boolean;
  speechToTexIsLoading: boolean;
  stopRecording: () => void;
  handleSpeechToText: () => void;
}

const MailSpeechToTextButtons: React.FC<MailSpeechToTextButtonsProps> = ({
  disabled,
  isRecording,
  speechToTexIsLoading,
  stopRecording,
  handleSpeechToText
}) => {
  debugRendering('MailSpeechToTextButtons');
  const { t } = useTranslationClient('audio');
  return (
    <>
      {isRecording ? (
        <Button type='button' variant='secondary' onClick={stopRecording}>
          <Mic size={20} />
          <span className='hidden sm:inline'>{t('stop')}</span>
        </Button>
      ) : speechToTexIsLoading ? (
        <Button type='button' variant='secondary' disabled>
          <Mic size={20} />
          <span className='hidden sm:inline'>{t('transcribing')}</span>
        </Button>
      ) : (
        <Button type='button' variant='secondary' onClick={handleSpeechToText} disabled={disabled}>
          <Mic size={20} />
          <span className='hidden sm:inline'>{t('transcribe')}</span>
        </Button>
      )}
    </>
  );
};

export default MailSpeechToTextButtons;
