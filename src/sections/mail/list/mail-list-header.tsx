import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListSummary from './mail-list-summary';
import MailListSearch from './mail-list-search';
import { EmailFilters } from '@/types/filters';
import { translationServer } from '@/i18n';
import MailMenuButton from '../mail-menu-button';
import MailListCompose from './mail-list-compose';

interface MailListHeaderProps {
  filters: EmailFilters;
}

const MailListHeader: React.FC<MailListHeaderProps> = async ({ filters }) => {
  debugRendering('MailListHeader');

  const { t } = await translationServer('mail-list');

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <div className='hidden sm:flex gap-5'>{t('title')}</div>
      <div className='flex gap-6 w-full sm:w-fit'>
        <MailListSummary />
        <MailListCompose />
        <MailListSearch initialValue={filters.search} />
        <MailMenuButton />
      </div>
    </div>
  );
};

export default MailListHeader;
