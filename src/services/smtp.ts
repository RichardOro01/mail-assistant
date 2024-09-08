'use server';

import { getEmailInstance } from '@/server/email';
import { getServerSession } from 'next-auth';
import { FetchError, FetchServerResponse } from './types';
import { ISendEmailRequest, ISendEmailResponse } from '@/types/smtp';
import { StandardError } from '@/lib/error/custom-error';

export const sendEmail = async ({
  to,
  subject,
  text
}: ISendEmailRequest): Promise<FetchServerResponse<ISendEmailResponse>> => {
  try {
    const email = await getEmailInstance();
    const session = await getServerSession();
    if (!email) return email_instance_not_found_error;
    const { smtp } = email;
    const info = await smtp.sendMail({
      from: `<${session?.user.email}>`,
      to,
      subject,
      text
    });
    return { data: info, status: 200, statusText: 'Ok' };
  } catch (error) {
    console.error(error);
    return unknown_error;
  }
};

const email_instance_not_found_error: FetchError<StandardError> = {
  detail: { code: 'email_instance_not_found', message: 'Email instance not found' },
  status: 500,
  statusText: 'Internal Server Error'
};

const unknown_error: FetchError<StandardError> = {
  detail: { code: 'email_unknown_error', message: 'Something went wrong' },
  status: 500,
  statusText: 'Internal Server Error'
};
