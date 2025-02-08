'use server';

// import openai from 'openai';
import * as fs from 'fs';

export const textToSpeech = async (text: string) => {
  //   const openaiClient = new openai();

  console.log(text);

  //   const response = await openaiClient.audio.speech.create({
  //     model: 'tts-1',
  //     voice: 'nova',
  //     input: text
  //   });
  //   return response.blob();

  const file = fs.readFileSync('temp/audio-{1738970608562-0.1371390592537931}.webm');
  return file;
};
