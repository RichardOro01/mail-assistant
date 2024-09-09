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

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { complete, completion, isLoading } = useSummaryAI();
  const { mails } = useMailContext();

  const handleGenerateSummary = () => {
    const messages = mails.map(({ emails }) => `${emails[0].text}`);
    complete(messages);
  };

  return (
    <Dialog modal>
      <DialogTrigger onClick={handleGenerateSummary}>Summary</DialogTrigger>
      <DialogContent className='w-full max-w-[700px]'>
        <DialogHeader>
          <DialogTitle>AI</DialogTitle>
          <DialogDescription>
            <pre className='text-balance'>{isLoading && !completion ? 'Summing up...' : completion}</pre>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
