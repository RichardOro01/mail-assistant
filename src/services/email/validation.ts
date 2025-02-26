import { ISendEmailRequest } from '@/types/smtp';
import { FetchError, StandardError } from '../types';
import { encoding_for_model, TiktokenModel } from 'tiktoken';

export const EMAIL_TO_LIMIT = 256;
export const EMAIL_SUBJECT_LIMIT = 78;
export const EMAIL_TEXT_LIMIT = 5120;

export const validateSendEmail = ({ to, subject, text }: ISendEmailRequest) => {
  if (to?.length > EMAIL_TO_LIMIT)
    throw {
      detail: { code: 'email_to_limit', message: 'Email destination too long' },
      status: 400,
      statusText: 'Bad Request'
    } as FetchError<StandardError>;
  if (subject?.length > EMAIL_SUBJECT_LIMIT)
    throw {
      detail: { code: 'email_subject_limit', message: 'Email subject too long' },
      status: 400,
      statusText: 'Bad Request'
    } as FetchError<StandardError>;
  if (text?.length > EMAIL_TEXT_LIMIT)
    throw {
      detail: { code: 'email_text_limit', message: 'Email text too long' },
      status: 400,
      statusText: 'Bad Request'
    } as FetchError<StandardError>;
};

export const validateMaxInputTokens = (input: string, model: TiktokenModel, maxTokens: number) => {
  const enc = encoding_for_model(model);
  const tokens = enc.encode(input);
  if (tokens.length > maxTokens)
    throw {
      detail: { code: 'input_too_long', message: 'Input too long' },
      status: 400,
      statusText: 'Bad Request'
    } as FetchError<StandardError>;
};

export const validateMaxInputCharacters = (input: string, maxCharacters: number) => {
  if (input.length > maxCharacters)
    throw {
      detail: { code: 'input_too_long', message: 'Input too long' },
      status: 400,
      statusText: 'Bad Request'
    } as FetchError<StandardError>;
};
