import { systems } from '@/lib/ai/system';
import { IGenerateMessageRequest } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt }: IGenerateMessageRequest = await req.json();

  const result = await streamText({
    system: systems.generateSummary,
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt
  });

  return result.toDataStreamResponse();
}
