import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailServiceBackend } from '@/services/email/email';

const MailListTableContainer: React.FC = async () => {
  debugRendering('MailListTableContainer');
  try {
    const messages = await emailServiceBackend.getMessages();
    return <MailListTable {...{ messages }} />;
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
