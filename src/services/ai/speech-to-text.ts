'use server';

import openai from 'openai';
import * as fs from 'fs';
import { createFile } from '@/lib/utils/file';

export const speechToText = async (audio: Uint8Array) => {
  const openaiClient = new openai();

  const filePatch = `temp/audio-{${Date.now()}-${Math.random()}}.webm`;

  createFile(filePatch, audio);
  const audioStream = fs.createReadStream(filePatch);

  const response = await openaiClient.audio.transcriptions.create({
    file: audioStream,
    model: 'whisper-1'
  });

  fs.unlinkSync(filePatch);

  return response.text;
};
