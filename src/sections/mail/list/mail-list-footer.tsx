import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListPagination from './mail-list-pagination';
import { EmailFilters } from '@/types/filters';

interface MailListFooterProps {
  filters: EmailFilters;
  totalPages: number;
}

const MailListFooter: React.FC<MailListFooterProps> = ({ filters, totalPages }) => {
  debugRendering('MailListFooter');
  return (
    <div className='flex justify-center py-2 px-7 text-xl items-center sticky bottom-0 bg-white z-10'>
      <MailListPagination {...{ totalPages }} initialValue={Number(filters.page) || 1} />
    </div>
  );
};

export default MailListFooter;
