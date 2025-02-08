import { NextResponse } from 'next/server';
import { ITextToSpeechRequest } from '@/types/ai';
import { StandardError } from '@/services/types';
import { textToSpeech } from '@/services/ai/text-to-speech';

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
        'Content-Type': 'audio/webm',
        'Content-Disposition': 'attachment; filename="audio.webm"'
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ code: 'unknown', message: 'Something went wrong' } as StandardError, { status: 500 });
  }
}
