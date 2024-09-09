'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { PencilLine, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import MailListSummary from './mail-list-summary';
import { useTranslationClient } from '@/i18n/client';

const MailListHeader: React.FC = () => {
  debugRendering('MailListHeader');

  const router = useRouter();
  const { t } = useTranslationClient('mail-list');

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <div className='flex gap-5'>{t('title')}</div>
      <div className='flex gap-6'>
        <MailListSummary />

        <button title={t('compose')} onClick={() => router.push(routes.mail.message.compose)}>
          <PencilLine color='gray' size={18} />
        </button>
        <button title={t('search')} onClick={() => router.push(routes.mail.message.compose)}>
          <Search color='gray' size={18} />
        </button>
      </div>
    </div>
  );
};

export default MailListHeader;
