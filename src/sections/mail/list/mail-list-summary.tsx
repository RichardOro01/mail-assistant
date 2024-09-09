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
import { useCompletion } from 'ai/react';
import { endpoints } from '@/lib/endpoints';
import { useMailContext } from '../provider/hooks';

const MESSAGE_LIMIT = 5;

const MailListSummary: React.FC = () => {
  debugRendering('MailListSummary');

  const { complete, completion, isLoading } = useCompletion({ api: endpoints.ai.generateSummary });
  const { mails } = useMailContext();
  const handleGenerateSummary = () => {
    let messages = '';
    for (let i = 0; i < mails.length && i < MESSAGE_LIMIT; i++) {
      const { emails } = mails[i];
      messages += `Message ${i}\n`;
      messages += `${emails[0].text}\n`;
    }

    complete(messages);
  };
  return (
    <Dialog modal>
      <DialogTrigger onClick={handleGenerateSummary}>Summary</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Summary</DialogTitle>
          <DialogDescription>{isLoading && !completion ? 'Summing up...' : completion}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MailListSummary;
