export interface IGenerateMessageRequest {
  message: string;
  answer: string;
  sendBy: string;
}

export interface IGenerateSummaryRequest {
  messages: string[];
}

export const MessagePriorityEnum = ['high', 'medium', 'low', 'none'] as const;

export type MessagePriorityType = (typeof MessagePriorityEnum)[number];

export const MessagePriorityNumeric = {
  high: 3,
  medium: 2,
  low: 1,
  none: 0
};

export interface ISpeechToTextResponse {
  text: string;
}

export interface ITextToSpeechRequest {
  text: string;
}
