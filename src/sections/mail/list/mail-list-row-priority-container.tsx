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
}

const MailListRowPriorityContainer: React.FC<MailListRowPriorityContainerProps> = async ({ message, uid }) => {
  debugRendering('MailListRowPriorityContainer');
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) throw new Error('No session');
    let priority: MessagePriorityType | undefined = (
      await prisma.message_priorities.findUnique({
        where: {
          user_id_message_uid: { message_uid: uid, user_id: session.user.id }
        }
      })
    )?.priority;
    if (!priority) {
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
    return <MailListRowPriority {...{ priority }} />;
  } catch (error) {
    handleLogApiError(error);
    return <MailListRowPriority priority='none' />;
  }
};

export default MailListRowPriorityContainer;
