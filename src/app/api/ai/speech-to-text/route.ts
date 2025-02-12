import { NextResponse } from 'next/server';
import { speechToText } from '@/services/ai/speech-to-text';
import { ISpeechToTextResponse } from '@/types/ai';
import { StandardError } from '@/services/types';
import { isInstanceOfStandardError } from '@/lib/error/error';

export const maxDuration = 30;

// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('audio') as Blob | null;

    if (!file) {
      return NextResponse.json({ code: 'no_file', message: 'No file' } as StandardError, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    const result = await speechToText(uint8Array);
    return NextResponse.json({ text: result } as ISpeechToTextResponse);
  } catch (e) {
    if (isInstanceOfStandardError(e)) {
      return NextResponse.json(e.detail, { status: e.status, statusText: e.statusText });
    }
    console.log(e);
    return NextResponse.json({ code: 'unknown', message: 'Something went wrong' }, { status: 500 });
  }
}
