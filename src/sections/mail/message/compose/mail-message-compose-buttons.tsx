import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { useTranslationClient } from '@/i18n/client';

const MailMessageComposeButtons: React.FC = () => {
  debugRendering('MailMessageComposeButtons');
  const {
    formState: { isSubmitting, isValid }
  } = useFormContext();
  const { t } = useTranslationClient('message-compose');

  return (
    <div className='flex gap-4'>
      <Button
        className='font-semibold'
        type='submit'
        loading={isSubmitting}
        disabled={isSubmitting || !isValid}
        variant='secondary'>
        {t('send')}
      </Button>
      <Button variant='outline' type='button'>
        {t('send_later')}
      </Button>
    </div>
  );
};

export default MailMessageComposeButtons;
