'use client';

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
import { ScrollText } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getMessagePriorityNumber } from '@/services/ai/utils';

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { t } = useTranslationClient('mail-list');
  const { complete, completion, isLoading, error } = useSummaryAI();
  const { mails } = useMailContext();

  const handleGenerateSummary = () => {
    complete(
      mails
        .sort((a, b) => getMessagePriorityNumber(b.priority) - getMessagePriorityNumber(a.priority))
        .map(({ text }) => text ?? '')
    );
  };

  return (
    <Dialog modal>
      <DialogTrigger onClick={handleGenerateSummary} aria-label={t('summary')}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ScrollText color='gray' size={18} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('summary')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className='w-full max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>{t('ai')}</DialogTitle>
          <DialogDescription>
            <pre className='text-balance'>
              {error ? t('summing_error') : isLoading && !completion ? t('summing_up') : completion}
            </pre>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
