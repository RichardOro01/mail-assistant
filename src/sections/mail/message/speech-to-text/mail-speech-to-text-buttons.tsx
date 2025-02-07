import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';

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
  return (
    <>
      {isRecording ? (
        <Button type='button' variant='secondary' onClick={stopRecording}>
          Stop
        </Button>
      ) : speechToTexIsLoading ? (
        <Button type='button' variant='secondary' disabled>
          Transcribing
        </Button>
      ) : (
        <Button type='button' variant='secondary' onClick={handleSpeechToText} disabled={disabled}>
          Speech to Text
        </Button>
      )}
    </>
  );
};

export default MailSpeechToTextButtons;
