'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { IMessage } from '@/types/imap';
import MailMessageContentHeader from './mail-message-content-header';
import { useAudioPlayer } from '@/lib/audio/use-audio-player';
import { useTextToSpeechAI } from '@/services/hooks';
import { useHandleError } from '@/lib/error/hooks';
import MailMessageContentCard from './mail-message-content-card';

interface MailMessageContentClientContainerProps {
  message: IMessage;
}

const MailMessageContentClientContainer: React.FC<MailMessageContentClientContainerProps> = ({ message }) => {
  debugRendering('MailMessageContentClientContainer');

  const { handleStandardError } = useHandleError();
  const { generateAudioFromText, isLoading } = useTextToSpeechAI();
  const { isPlaying, play, stop } = useAudioPlayer();

  const handleSpeech = async () => {
    if (isPlaying) {
      stop();
    } else {
      if (message.text) {
        try {
          const audio = await generateAudioFromText(message.text);
          if (audio) {
            play(audio);
          }
        } catch (e) {
          handleStandardError(e, {
            showToast: true
          });
        }
      }
    }
  };

  return (
    <>
      <MailMessageContentHeader
        subject={message.subject ?? ''}
        onSpeech={handleSpeech}
        isSpeaking={isPlaying}
        isSpeechLoading={isLoading}
        uid={message.uid}
      />
      <MailMessageContentCard message={message} />
    </>
  );
};

export default MailMessageContentClientContainer;
