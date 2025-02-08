'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { IMessage } from '@/types/imap';
import MailMessageContentHeader from './mail-message-content-header';
import dynamic from 'next/dynamic';
import { useAudioPlayer } from '@/lib/audio/use-audio-player';
import { useTextToSpeechAI } from '@/services/hooks';
import { useHandleError } from '@/lib/error/hooks';
const MailMessageContentCard = dynamic(() => import('./mail-message-content-card'), { ssr: false });

interface MailMessageContentContainerProps {
  message: IMessage;
}

const MailMessageContentContainer: React.FC<MailMessageContentContainerProps> = ({ message }) => {
  debugRendering('MailMessageContentContainer');

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
          } else {
            throw new Error('No audio');
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
      />
      <MailMessageContentCard message={message} />
    </>
  );
};

export default MailMessageContentContainer;
