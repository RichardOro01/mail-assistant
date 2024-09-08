import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';

const MailMessageComposeButtons: React.FC = () => {
  debugRendering('MailMessageComposeButtons');
  const {
    formState: { isSubmitting }
  } = useFormContext();

  return (
    <div className='flex gap-4'>
      <Button className='font-semibold' type='submit' loading={isSubmitting} variant='secondary'>
        Send
      </Button>
      <Button variant='outline' type='button'>
        Send later
      </Button>
    </div>
  );
};

export default MailMessageComposeButtons;
