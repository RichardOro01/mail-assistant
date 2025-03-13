'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import Link from 'next/link';
import { PencilLine } from 'lucide-react';
import { routes } from '@/lib/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTranslationClient } from '@/i18n/client';

const MailListCompose: React.FC = () => {
  debugRendering('MailListCompose');

  const { t } = useTranslationClient('mail-list');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='hidden sm:flex'>
          <Link
            aria-label={t('compose')}
            href={routes.mail.message.compose}
            className='content-center h-full flex items-center'>
            <PencilLine color='gray' size={18} />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('compose')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MailListCompose;
