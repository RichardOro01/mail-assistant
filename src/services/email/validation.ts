import { ISendEmailRequest } from '@/types/smtp';
import { FetchError, StandardError } from '../types';

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
