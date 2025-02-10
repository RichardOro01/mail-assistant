import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListRowPriority from './mail-list-row-priority';
import { getMessagePriority } from '@/services/ai/message-priority';
import { handleLogApiError } from '@/lib/error/server-functions';

interface MailListRowPriorityContainerProps {
  message?: string;
}

const MailListRowPriorityContainer: React.FC<MailListRowPriorityContainerProps> = async ({ message }) => {
  debugRendering('MailListRowPriorityContainer');
  try {
    const priority = message ? await getMessagePriority(message) : 'none';
    return <MailListRowPriority {...{ priority }} />;
  } catch (error) {
    handleLogApiError(error);
    return <MailListRowPriority priority='none' />;
  }
};

export default MailListRowPriorityContainer;
