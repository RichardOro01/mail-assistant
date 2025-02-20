import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListRowPriority from './mail-list-row-priority';
import { getMessagePriority } from '@/services/ai/message-priority';
import { handleLogApiError } from '@/lib/error/server-functions';
import prisma from '@/lib/prisma';
import { auth } from '@/auth/config';
import { MessagePriorityType } from '@/types/ai';

interface MailListRowPriorityContainerProps {
  message?: string;
  uid: number;
  priority?: MessagePriorityType;
}

const MailListRowPriorityContainer: React.FC<MailListRowPriorityContainerProps> = async ({
  message,
  uid,
  priority
}) => {
  debugRendering('MailListRowPriorityContainer');
  try {
    if (!priority) {
      const session = await auth();
      if (!session || !session.user || !session.user.email) throw new Error('No session');
      priority = message ? await getMessagePriority(message) : 'none';
      if (priority !== 'none') {
        await prisma.message_priorities.create({
          data: {
            user_id: session.user.id,
            message_uid: uid,
            priority
          }
        });
      }
    }
    return <MailListRowPriority {...{ priority, uid }} shouldUpdate={!priority} />;
  } catch (error) {
    handleLogApiError(error);
    return <MailListRowPriority priority='none' />;
  }
};

export default MailListRowPriorityContainer;
