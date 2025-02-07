import { generateAnswer } from '@/services/ai/generate-answer';
import { IGenerateMessageRequest } from '@/types/ai';

export const maxDuration = 30;

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt }: IGenerateMessageRequest = await req.json();

  const result = await generateAnswer(prompt);

  return result.toDataStreamResponse();
}
