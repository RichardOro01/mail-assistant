import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';

const MailListTableContainer: React.FC = async () => {
  debugRendering('MailListTableContainer');
  try {
    // const conversations = await getConversations();
    return <MailListTable conversations={[]} />;
  } catch (error) {
    console.error(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
