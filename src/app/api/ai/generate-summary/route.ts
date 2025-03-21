import { isInstanceOfStandardError } from '@/lib/error/error';
import { generateSummary } from '@/services/ai/generate-summary';
import { IGenerateSummaryRequest } from '@/types/ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { message }: IGenerateSummaryRequest = await req.json();

    const result = await generateSummary(message);
    return result;
  } catch (e) {
    if (isInstanceOfStandardError(e)) {
      return NextResponse.json(e.detail, { status: e.status, statusText: e.statusText });
    }
    console.log(e);
    return NextResponse.json({ code: 'unknown', message: 'Something went wrong' }, { status: 500 });
  }
}
