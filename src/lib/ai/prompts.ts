import { IGenerateMessageRequest, IMessageToSummary } from '@/types/ai';

export const prompts = {
  generateAnswer: (data: IGenerateMessageRequest) => `
    This is the email: ${data.message},
    This is the current answer: ${data.answer},
    This is the who send me the email: ${data.sendBy}
  `,
  generateSummary: (messages: IMessageToSummary[], limit: number) => {
    let messagesString = '';
    for (let i = 0; i < messages.length && i < limit; i++) {
      const message = messages[i];
      messagesString += `Message ${i}
      from: ${message.sendBy}
      text: ${message.message}\n`;
    }
    return messagesString;
  }
};
