import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailService } from '@/services/email';

const MailListTableContainer: React.FC = async () => {
  debugRendering('MailListTableContainer');
  try {
    const { data } = await emailService.getMails();
    return <MailListTable messages={data.reverse()} />;
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
