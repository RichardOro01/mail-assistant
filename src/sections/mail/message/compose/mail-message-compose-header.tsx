'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailOpenMenuButton from '../../mail-open-menu-button';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { useTranslationClient } from '@/i18n/client';

const MailMessageComposeHeader: React.FC = () => {
  debugRendering('MailMessageComposeHeader');
  const { t } = useTranslationClient('message-compose');
  return (
    <div className='flex w-full justify-between'>
      <div className='flex gap-4 items-center'>
        <Link href={routes.mail.list}>
          <Button className='rounded-full shadow-md' variant='link' size='icon'>
            <ChevronLeft color='gray' />
          </Button>
        </Link>
        <h2 className='text-2xl font-semibold'>{t('title')}</h2>
      </div>
      <MailOpenMenuButton />
    </div>
  );
};

export default MailMessageComposeHeader;
