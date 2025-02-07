import { generateSummary } from '@/services/ai/generate-summary';
import { IGenerateSummaryRequest } from '@/types/ai';

export const maxDuration = 30;

export const runtime = 'edge';

const MESSAGE_LIMIT = 5;

export async function POST(req: Request) {
  const { messages }: IGenerateSummaryRequest = await req.json();

  const result = await generateSummary(messages, MESSAGE_LIMIT);

  return result.toDataStreamResponse();
}
