import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListSearch from './mail-list-search';
import { EmailFilters } from '@/types/filters';
import MailOpenMenuButton from '../mail-open-menu-button';
import MailListCompose from './mail-list-compose';
import MailListRefresh from './mail-list-refresh';
import MailListTitle from './mail-list-title';

interface MailListHeaderProps {
  filters: EmailFilters;
}

const MailListHeader: React.FC<MailListHeaderProps> = async ({ filters }) => {
  debugRendering('MailListHeader');

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <MailListTitle />
      <div className='flex gap-6 w-full sm:w-fit'>
        <MailListRefresh />
        <MailListCompose />
        <MailListSearch initialValue={filters.search} />
        <MailOpenMenuButton />
      </div>
    </div>
  );
};

export default MailListHeader;
