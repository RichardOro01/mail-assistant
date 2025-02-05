export interface IGenerateMessageRequest {
  prompt: string;
}

export interface IGenerateSummaryRequest {
  messages: string[];
}

export const MessagePriorityEnum = ['high', 'medium', 'low', 'none'] as const;

export type MessagePriorityType = (typeof MessagePriorityEnum)[number];
