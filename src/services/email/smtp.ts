'use server';

import { getEmailInstance } from '@/server/email';
import { getServerSession } from 'next-auth';
import { FetchError, FetchServerResponse, StandardError } from '../types';
import { IReplyEmailRequest, ISendEmailRequest, ISendEmailResponse } from '@/types/smtp';
import { NEXT_SMTP_TIMEOUT_SEND_EMAIL } from '@/config';

export const sendEmail = async ({
  to,
  subject,
  text
}: ISendEmailRequest): Promise<FetchServerResponse<ISendEmailResponse>> =>
  new Promise(async (resolve) => {
    try {
      const email = await getEmailInstance();
      const session = await getServerSession();
      if (!email) resolve(email_instance_not_found_error);
      else {
        const { smtp } = email;
        setTimeout(() => resolve(send_email_timeout), NEXT_SMTP_TIMEOUT_SEND_EMAIL);
        const info = await smtp.sendMail({
          from: `<${session?.user.email}>`,
          to,
          subject,
          text
        });
        resolve({ data: info, status: 200, statusText: 'Ok' });
      }
    } catch (error) {
      console.error(error);
      resolve(unknown_error);
    }
  });

export const replyEmail = async ({
  messageId,
  replyTo,
  text
}: IReplyEmailRequest): Promise<FetchServerResponse<ISendEmailResponse>> =>
  new Promise(async (resolve) => {
    try {
      const email = await getEmailInstance();
      const session = await getServerSession();
      if (!email) resolve(email_instance_not_found_error);
      else {
        const { smtp } = email;
        setTimeout(() => resolve(send_email_timeout), NEXT_SMTP_TIMEOUT_SEND_EMAIL);
        const info = await smtp.sendMail({
          from: `<${session?.user.email}>`,
          replyTo,
          to: replyTo,
          text,
          inReplyTo: messageId
        });
        resolve({ data: info, status: 200, statusText: 'Ok' });
      }
    } catch (error) {
      console.error(error);
      resolve(unknown_error);
    }
  });

const email_instance_not_found_error: FetchError<StandardError> = {
  detail: { code: 'email_instance_not_found', message: 'Email instance not found' },
  status: 500,
  statusText: 'Internal Server Error'
};

const send_email_timeout: FetchError<StandardError> = {
  detail: { code: 'send_email_timeout', message: 'Send email timeout' },
  status: 500,
  statusText: 'Internal Server Error'
};

const unknown_error: FetchError<StandardError> = {
  detail: { code: 'email_unknown_error', message: 'Something went wrong' },
  status: 500,
  statusText: 'Internal Server Error'
};
