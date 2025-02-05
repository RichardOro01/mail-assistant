import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailService } from '@/services/email';
import { EmailFilters, PageFilter, SearchFilter } from '@/types/filters';
import MailListFooter from './mail-list-footer';
import MailListMessagesSetter from './mail-list-messages-setter';

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
    return (
      <MailListMessagesSetter {...{ messages }}>
        <MailListTable {...{ messages }} />
        {!!data.items.length && <MailListFooter filters={filters} totalPages={data.totalPages} />}
      </MailListMessagesSetter>
    );
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
