'use server';

import openai from 'openai';

export const textToSpeech = async (text: string) => {
  const openaiClient = new openai();

  const response = await openaiClient.audio.speech.create({
    model: 'tts-1',
    voice: 'nova',
    input: text,
    response_format: 'mp3'
  });
  return Buffer.from(await response.arrayBuffer());
};
