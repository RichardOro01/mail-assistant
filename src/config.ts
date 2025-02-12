import { ai_use_type } from '@prisma/client';

if (!process.env.NEXT_MAIL_SERVER_HOST) {
  throw new Error('NEXT_MAIL_SERVER_HOST env is not defined');
}

export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
export const NEXT_MAIL_SERVER_HOST = process.env.NEXT_MAIL_SERVER_HOST;
export const NEXT_IMAP_MAIL_SERVER_PORT = Number(process.env.NEXT_IMAP_MAIL_SERVER_PORT) || 993;
export const NEXT_SMTP_MAIL_SERVER_PORT = Number(process.env.NEXT_SMTP_MAIL_SERVER_PORT) || 587;
export const NEXT_OPENAI_API_KEY = process.env.NEXT_OPENAI_API_KEY;
export const SESSION_EXPIRES_DAYS = Number(process.env.SESSION_EXPIRES_DAYS) || 1;
export const NEXT_SMTP_TIMEOUT_SEND_EMAIL = Number(process.env.NEXT_SMTP_TIMEOUT_SEND_EMAIL) || 10000;
export const OPENAI_LIMITS_PER_DAY: Record<ai_use_type, number> = {
  summary: Number(process.env.OPENAI_SUMMARY_LIMIT_PER_DAY) || 3,
  generate_answer: Number(process.env.OPENAI_GENERATE_ANSWER_LIMIT_PER_DAY) || 10,
  priority: Number(process.env.OPENAI_PRIORITY_LIMIT_PER_DAY) || 100,
  speech_to_text: Number(process.env.OPENAI_SPEECH_TO_TEXT_LIMIT_PER_DAY) || 10,
  text_to_speech: Number(process.env.OPENAI_TEXT_TO_SPEECH_LIMIT_PER_DAY) || 10
};
