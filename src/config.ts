export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
export const NEXT_PUBLIC_TRPC_URL = process.env.NEXT_PUBLIC_TRPC_URL;
export const NEXT_MAIL_SERVER_HOST = process.env.NEXT_MAIL_SERVER_HOST;
export const NEXT_IMAP_MAIL_SERVER_PORT = process.env.NEXT_IMAP_MAIL_SERVER_PORT;
export const NEXT_SMTP_MAIL_SERVER_PORT = process.env.NEXT_SMTP_MAIL_SERVER_PORT;
export const NEXT_OPENAI_API_KEY = process.env.NEXT_OPENAI_API_KEY;
export const SESSION_EXPIRES_DAYS = Number(process.env.SESSION_EXPIRES_DAYS) || 1;
export const NEXT_SMTP_TIMEOUT_SEND_EMAIL = Number(process.env.NEXT_SMTP_TIMEOUT_SEND_EMAIL) || 10000;
