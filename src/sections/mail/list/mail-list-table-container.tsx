import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailListTable from './mail-list-table';
import { emailService } from '@/services/email';
import { EmailFilters, SearchFilter } from '@/types/filters';

interface MailListTableContainerProps {
  messagesCount: number;
  filters: EmailFilters;
}

const MailListTableContainer: React.FC<MailListTableContainerProps> = async ({ messagesCount, filters }) => {
  debugRendering('MailListTableContainer');
  try {
    const { data } = await emailService.getMails({ limit: messagesCount, search: filters[SearchFilter] });
    return <MailListTable messages={data.reverse()} />;
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailListTableContainer;
