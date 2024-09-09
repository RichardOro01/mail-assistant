import React, { useEffect } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FormTextarea from '@/components/form-hook/form-textarea';
import MailMessageReplyButtons from './mail-message-reply-buttons';
import { useCompletion } from 'ai/react';
import { endpoints } from '@/lib/endpoints';
import { useMailContext } from '@/sections/mail/provider/hooks';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { IReplyEmailForm } from '@/types/smtp';

const MailMessageReplyForm: React.FC = () => {
  const { completion, complete, isLoading, stop } = useCompletion({ api: endpoints.ai.generateAnswer });
  const { selectedMail } = useMailContext();

  const generateAnswer = () => {
    if (selectedMail) complete(selectedMail.emails[0].text);
  };

  const { setValue } = useFormContext<IReplyEmailForm>();

  useEffect(() => {
    setValue('text', completion);
  }, [completion, setValue]);

  debugRendering('MailMessageReplyForm');
  return (
    <div className='flex flex-col gap-2'>
      <FormTextarea
        name='text'
        className='w-full text-lg font-medium resize-none bg-transparent'
        rows={5}
        placeholder={isLoading ? 'Thinking...' : ''}
        disabled={isLoading}
      />
      <MailMessageReplyButtons />
      {!isLoading ? (
        <Button type='button' variant='secondary' onClick={generateAnswer}>
          Generate
        </Button>
      ) : (
        <Button type='button' variant='secondary' onClick={stop}>
          Stop
        </Button>
      )}
    </div>
  );
};

export default MailMessageReplyForm;
