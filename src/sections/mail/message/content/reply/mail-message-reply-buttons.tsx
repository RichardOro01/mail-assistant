import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

const MailMessageReplyButtons: React.FC = () => {
  debugRendering('MailMessageReplyButtons');
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext();

  return (
    <div className='flex gap-4'>
      <Button
        className='font-semibold'
        type='submit'
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
        variant='secondary'>
        Send
      </Button>
      <Button variant='outline' type='button'>
        Send later
      </Button>
    </div>
  );
};

export default MailMessageReplyButtons;
