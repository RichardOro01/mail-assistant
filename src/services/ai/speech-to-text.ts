'use server';

import openai from 'openai';
import * as fs from 'fs';
import { createFile } from '@/lib/utils/file';
import { sumUserAICount, verifyUserAICount } from './ai-count';

export const speechToText = async (audio: Uint8Array) => {
  await verifyUserAICount('speech_to_text');

  const openaiClient = new openai();

  const filePatch = `temp/audio-{${Date.now()}-${Math.random()}}.webm`;

  createFile(filePatch, audio);
  const audioStream = fs.createReadStream(filePatch);

  try {
    const response = await openaiClient.audio.transcriptions.create({
      file: audioStream,
      model: 'whisper-1'
    });
    fs.unlink(filePatch, (err) => {
      if (err) {
        console.error(err);
      }
    });

    sumUserAICount('speech_to_text');

    return response.text;
  } catch (error) {
    fs.unlink(filePatch, (err) => {
      if (err) {
        console.error(err);
      }
    });
    throw error;
  }
};
