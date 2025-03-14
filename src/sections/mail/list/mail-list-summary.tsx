'use client';

import React, { useCallback, useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import {
  Dialog,
  DialogFooter,
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
import { Button } from '@/components/ui/button';

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { t } = useTranslationClient('mail-list');
  const { complete, completion, isLoading, error, stop } = useSummaryAI();
  const { selectedMailsCheckbox } = useMailContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateSummary = useCallback(() => {
    complete(
      selectedMailsCheckbox.map(({ text, from }) => ({
        message: text ?? '',
        sendBy: from.name || from.address || 'unknown'
      }))
    );
  }, [selectedMailsCheckbox, complete]);

  const handleDialogChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) stop();
    },
    [setIsDialogOpen, stop]
  );

  return (
    <Dialog modal onOpenChange={handleDialogChange} open={isDialogOpen}>
      <DialogTrigger disabled={!selectedMailsCheckbox.length} onClick={handleGenerateSummary} aria-label={t('summary')}>
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
        </DialogHeader>
        <DialogDescription>
          <pre className='text-balance'>
            {error ? t('summing_error') : isLoading && !completion ? t('summing_up') : completion}
          </pre>
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>{t('accept')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
