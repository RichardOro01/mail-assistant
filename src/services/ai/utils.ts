import { MessagePriorityNumeric, MessagePriorityType } from '@/types/ai';

export const getMessagePriorityNumber = (messagePriority?: MessagePriorityType) => {
  if (!messagePriority) return 0;
  return MessagePriorityNumeric[messagePriority];
};

export const removeLinkFromText = (text: string) => text.replace(/https?:\/\/[^\s]+/g, '');
