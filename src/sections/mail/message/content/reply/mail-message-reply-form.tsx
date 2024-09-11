import React, { useEffect } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FormTextarea from '@/components/form-hook/form-textarea';
import MailMessageReplyButtons from './mail-message-reply-buttons';
import { useMailContext } from '@/sections/mail/provider/hooks';
import { Button } from '@/components/ui/button';
import { useFormContext } from 'react-hook-form';
import { IReplyEmailForm } from '@/types/smtp';
import { useGenerateAnswerAI } from '@/services/hooks';
import { useTranslationClient } from '@/i18n/client';
import FormInput from '@/components/form-hook/form-input';
import { Label } from '@/components/ui/label';

const MailMessageReplyForm: React.FC = () => {
  const { completion, complete, isLoading, stop } = useGenerateAnswerAI();
  const { selectedMail } = useMailContext();
  const { t } = useTranslationClient('message-reply');

  const generateAnswer = () => {
    if (selectedMail && selectedMail.text) complete(selectedMail.text);
  };

  const { setValue } = useFormContext<IReplyEmailForm>();

  useEffect(() => {
    setValue('text', completion);
  }, [completion, setValue]);

  debugRendering('MailMessageReplyForm');
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-4 mb-4'>
        <Label className=''>{t('to')}</Label>
        <FormInput
          name='to'
          placeholder='To'
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
        />
      </div>
      <FormTextarea
        autoSize
        name='text'
        className='w-full text-lg font-medium  bg-transparent resize-none overflow-hidden'
        rows={5}
        placeholder={isLoading ? t('thinking') : ''}
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
