import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import Link from 'next/link';
import { PencilLine } from 'lucide-react';
import { routes } from '@/lib/routes';
import { translationServer } from '@/i18n';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const MailListCompose: React.FC = async () => {
  debugRendering('MailListCompose');

  const { t } = await translationServer('mail-list');

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='hidden sm:flex'>
          <Link aria-label={t('compose')} href={routes.mail.message.compose} className='content-center'>
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
