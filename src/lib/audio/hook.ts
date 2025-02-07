import { useToast } from '@/hooks/use-toast';
import { useTranslationClient } from '@/i18n/client';
import { useState } from 'react';

interface useAudioRecordProps {
  onRecord: (blob: Blob) => void;
}

export const useAudioRecord = ({ onRecord }: useAudioRecordProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const { toast } = useToast();
  const { t } = useTranslationClient('audio');

  const startRecording = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        const audioChunks: Blob[] = [];

        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
          stream.getTracks().forEach((track) => track.stop());
          onRecord(audioBlob);
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      })
      .catch((e) => {
        console.log({ e });
        toast({
          variant: 'destructive',
          title: 'Error',
          description: t('microphone_not_enabled')
        });
      });
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  return {
    isRecording,
    startRecording,
    stopRecording
  };
};
