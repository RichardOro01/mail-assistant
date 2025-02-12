import { NextResponse } from 'next/server';
import { ITextToSpeechRequest } from '@/types/ai';
import { StandardError } from '@/services/types';
import { textToSpeech } from '@/services/ai/text-to-speech';
import { isInstanceOfStandardError } from '@/lib/error/error';

export const maxDuration = 30;

// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { text }: ITextToSpeechRequest = await req.json();

    if (!text) {
      return NextResponse.json({ code: 'no_text', message: 'No text' } as StandardError, { status: 400 });
    }

    const result = await textToSpeech(text);
    return new Response(result, {
      headers: {
        'Content-Type': 'audio/mp3',
        'Content-Disposition': 'attachment; filename="audio.mp3"'
      }
    });
  } catch (e) {
    if (isInstanceOfStandardError(e)) {
      return NextResponse.json(e.detail, { status: e.status, statusText: e.statusText });
    }
    console.log(e);
    return NextResponse.json({ code: 'unknown', message: 'Something went wrong' }, { status: 500 });
  }
}
