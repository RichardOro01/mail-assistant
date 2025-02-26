import { ISendEmailRequest } from '@/types/smtp';
import { FetchError, StandardError } from '../types';
import { encoding_for_model, TiktokenModel } from 'tiktoken';
import { EMAIL_SUBJECT_LIMIT, EMAIL_TEXT_LIMIT, EMAIL_TO_LIMIT } from './validation-consts';

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
