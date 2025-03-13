'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { CircleX } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslationClient } from '@/i18n/client';
import { useRouterRefresh } from '@/lib/utils/router';

const GeneralError: React.FC = () => {
  debugRendering('General-error');
  const { refresh, isRefreshing } = useRouterRefresh();
  const { t } = useTranslationClient('error');
  return (
    <div className='flex flex-col gap-2 flex-1 w-full h-full justify-center items-center'>
      <CircleX size={40} />
      <h2 className='text-2xl font-medium'>Error</h2>
      <Button disabled={isRefreshing} loading={isRefreshing} variant='outline' className='w-fit' onClick={refresh}>
        {t('reload')}
      </Button>
    </div>
  );
};

export default GeneralError;
