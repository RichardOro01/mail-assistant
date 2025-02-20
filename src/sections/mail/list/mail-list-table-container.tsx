import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailService } from '@/services/email';
import { EmailFilters, PageFilter, SearchFilter } from '@/types/filters';
import MailListFooter from './mail-list-footer';
import MailListMessagesSetter from './mail-list-messages-setter';
import prisma from '@/lib/prisma';
import { IMessageWithPriority } from '@/types/imap';

interface MailListTableContainerProps {
  messagesCount: number;
  filters: EmailFilters;
}

const MailListTableContainer: React.FC<MailListTableContainerProps> = async ({ messagesCount, filters }) => {
  debugRendering('MailListTableContainer');
  try {
    const { data } = await emailService.getMails({
      limit: messagesCount,
      search: filters[SearchFilter],
      page: Number(filters[PageFilter])
    });
    const messages = data.items.reverse();

    const priorities = await prisma.message_priorities.findMany({
      where: { message_uid: { in: messages.map((m) => m.uid) } },
      select: { message_uid: true, priority: true }
    });

    const messagesWithPriorities: IMessageWithPriority[] = messages.map((message) => ({
      ...message,
      priority: priorities.find(({ message_uid }) => message.uid === message_uid)?.priority
    }));

    return (
      <MailListMessagesSetter {...{ messagesWithPriorities }}>
        <MailListTable {...{ messagesWithPriorities }} />
        {!!data.items.length && <MailListFooter filters={filters} totalPages={data.totalPages} />}
      </MailListMessagesSetter>
    );
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
