import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { useMailMessageReplyForm } from './mail-message-hooks';
import { emailService } from '@/services';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useHandleError } from '@/lib/error/hooks';
import { useTranslationClient } from '@/i18n/client';
import { routes } from '@/lib/routes';
import FormProvider from '@/components/form-hook/form-provider';
import MailMessageReplyForm from './mail-message-reply-form';
import { useMailContext } from '@/sections/mail/provider/hooks';

const MailMessageReplyContainer: React.FC = () => {
  debugRendering('MailMessageReplyContainer');
  const { t } = useTranslationClient('message-reply');
  const { selectedMail } = useMailContext();
  const mail = selectedMail?.emails[0];
  const methods = useMailMessageReplyForm({ defaultTo: mail?.from.email ?? '' });
  const { handleStandardError } = useHandleError();
  const { handleSubmit } = methods;
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await emailService.replyEmail({ text: data.text, messageId: mail?.id ?? '', replyTo: data.to });

      toast({ title: t('success'), variant: 'success' });
      router.push(routes.mail.list);
    } catch (error) {
      handleStandardError(error, { showToast: true });
    }
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <MailMessageReplyForm />
    </FormProvider>
  );
};

export default MailMessageReplyContainer;
