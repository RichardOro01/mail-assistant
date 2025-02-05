import { aiService } from '@/services/ai';
import { IGenerateMessageRequest } from '@/types/ai';

export const maxDuration = 30;

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt }: IGenerateMessageRequest = await req.json();

  const result = await aiService.getMessagePriority(prompt);

  return result.text;
}
