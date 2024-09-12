import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailService } from '@/services/email';

interface MailListTableContainerProps {
  messagesCount: number;
}

const MailListTableContainer: React.FC<MailListTableContainerProps> = async ({ messagesCount }) => {
  debugRendering('MailListTableContainer');
  try {
    const { data } = await emailService.getMails({ limit: messagesCount });
    return <MailListTable messages={data.reverse()} />;
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
