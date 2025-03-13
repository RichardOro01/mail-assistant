'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { RefreshCcw } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';
import { useRouterRefresh } from '@/lib/utils/router';
import clsx from 'clsx';

const MailListRefresh: React.FC = () => {
  debugRendering('MailListRefresh');

  const { t } = useTranslationClient('mail-list');
  const { refresh, isRefreshing } = useRouterRefresh();

  const handleRefresh = () => {
    refresh();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger disabled={isRefreshing} onClick={handleRefresh}>
          <RefreshCcw
            className={clsx('animate-duration-[2000ms]', { 'animate-spin': isRefreshing })}
            color='gray'
            size={18}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('refresh')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MailListRefresh;
