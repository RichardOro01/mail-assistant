import { MessagePriorityNumeric, MessagePriorityType } from '@/types/ai';

export const getMessagePriorityNumber = (messagePriority?: MessagePriorityType) => {
  if (!messagePriority) return 0;
  return MessagePriorityNumeric[messagePriority];
};

export const cleanText = (text: string) => {
  text = removeLinkFromText(text);
  text = text.replaceAll(/(^|[^\\])"/g, '$1\\"');
  return text;
};

export const removeLinkFromText = (text: string) => text.replace(/https?:\/\/[^\s]+/g, '');
