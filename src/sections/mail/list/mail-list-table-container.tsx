import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { getConversations } from '@/services/email';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';

const MailListTableContainer: React.FC = async () => {
  debugRendering('MailListTableContainer');
  try {
    const conversations = await getConversations();
    return <MailListTable conversations={conversations.reverse()} />;
  } catch (error) {
    console.error(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
