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
import clsx from 'clsx';

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { t } = useTranslationClient('mail-list');
  const summaryHooks = useSummaryAI();
  const { selectedMailsCheckbox } = useMailContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleGenerateSummary = useCallback(() => {
    selectedMailsCheckbox.forEach(({ text, uid }, index) => summaryHooks[index].complete({ message: text ?? '', uid }));
  }, [selectedMailsCheckbox, summaryHooks]);

  const handleDialogChange = useCallback(
    (open: boolean) => {
      setIsDialogOpen(open);
      if (!open) selectedMailsCheckbox.forEach((_, index) => summaryHooks[index].stop());
    },
    [setIsDialogOpen, selectedMailsCheckbox, summaryHooks]
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
        <DialogDescription className='flex flex-col gap-4 px-1 h-[50vh] max-h-[400px] overflow-auto'>
          {selectedMailsCheckbox.map(({ from, subject }, index) => {
            const currentHook = summaryHooks[index];
            return (
              <div className='flex flex-col gap-2 w-full' key={index}>
                <span>
                  <b>{from.name || from.address}</b> - {subject}.
                </span>
                <p
                  className={clsx('text-justify w-full', {
                    'text-red-500': currentHook.customError || currentHook.error
                  })}>
                  {currentHook.customError
                    ? currentHook.customError
                    : currentHook.error
                      ? t('summing_error')
                      : currentHook.isLoading && !currentHook.completion
                        ? t('summing_up')
                        : currentHook.completion}
                </p>
              </div>
            );
          })}
        </DialogDescription>
        <DialogFooter>
          <Button onClick={() => setIsDialogOpen(false)}>{t('accept')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
