import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useMailContext } from '../provider/hooks';
import { useSummaryAI } from '@/services/hooks';
import { useTranslationClient } from '@/i18n/client';

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { t } = useTranslationClient('mail-list');
  const { complete, completion, isLoading } = useSummaryAI();
  const { mails } = useMailContext();

  const handleGenerateSummary = () => {
    complete(mails.map(({ text }) => text ?? ''));
  };

  return (
    <Dialog modal>
      <DialogTrigger onClick={handleGenerateSummary}>{t('summary')}</DialogTrigger>
      <DialogContent className='w-full max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{t('ai')}</DialogTitle>
          <DialogDescription>
            <pre className='text-balance'>{isLoading && !completion ? t('summing_up') : completion}</pre>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
