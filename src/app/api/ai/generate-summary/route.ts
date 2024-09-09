import { systems } from '@/lib/ai/system';
import { IGenerateSummaryRequest } from '@/types/ai';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export const runtime = 'edge';

const MESSAGE_LIMIT = 5;

export async function POST(req: Request) {
  const { messages }: IGenerateSummaryRequest = await req.json();

  let messagesString = '';
  for (let i = 0; i < messages.length && i < MESSAGE_LIMIT; i++) {
    const message = messages[i];
    messagesString += `Message ${i}\n`;
    messagesString += `${message}\n`;
  }

  const result = await streamText({
    system: systems.generateSummary(),
    model: openai.completion('gpt-3.5-turbo-instruct'),
    maxTokens: 2000,
    prompt: messagesString
  });

  return result.toDataStreamResponse();
}
