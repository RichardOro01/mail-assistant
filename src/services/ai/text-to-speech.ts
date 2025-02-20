'use server';

import openai from 'openai';
import { sumUserAICount, verifyUserAICount } from './ai-count';
import { removeLinkFromText } from './utils';

export const textToSpeech = async (text: string) => {
  await verifyUserAICount('text_to_speech');

  const openaiClient = new openai();

  text = removeLinkFromText(text);

  const response = await openaiClient.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
    response_format: 'mp3'
  });

  sumUserAICount('text_to_speech');

  return Buffer.from(await response.arrayBuffer());
};
