import { IGenerateMessageRequest } from '@/types/ai';

export const prompts = {
  generateAnswer: (data: IGenerateMessageRequest) => `
    This is the email: ${data.message},
    This is the current answer: ${data.answer},
    This is the who send me the email: ${data.sendBy}
  `
};
