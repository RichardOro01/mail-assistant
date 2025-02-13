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

export interface ISpeechToTextResponse {
  text: string;
}

export interface ITextToSpeechRequest {
  text: string;
}
