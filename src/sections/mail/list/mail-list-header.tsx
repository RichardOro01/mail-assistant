import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { PencilLine } from 'lucide-react';
import { routes } from '@/lib/routes';
import MailListSummary from './mail-list-summary';
import MailListSearch from './mail-list-search';
import { EmailFilters } from '@/types/filters';
import Link from 'next/link';
import { translationServer } from '@/i18n';

interface MailListHeaderProps {
  filters: EmailFilters;
}

const MailListHeader: React.FC<MailListHeaderProps> = async ({ filters }) => {
  debugRendering('MailListHeader');

  const { t } = await translationServer('mail-list');

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <div className='flex gap-5'>{t('title')}</div>
      <div className='flex gap-6'>
        <MailListSummary />

        <Link aria-label={t('compose')} href={routes.mail.message.compose} className='content-center'>
          <PencilLine color='gray' size={18} />
        </Link>
        <MailListSearch initialValue={filters.search} />
      </div>
    </div>
  );
};

export default MailListHeader;
