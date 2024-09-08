'use client';

import { emailService } from '@/services';
import { useHandleError } from '@/lib/error/hooks';
import FormProvider from '@/components/form-hook/form-provider';
import MailMessageComposeForm from './mail-message-compose-form';
import { useMailMessageForm } from './mail-message-hooks';
import { toast } from '@/hooks/use-toast';
import { useTranslationClient } from '@/i18n/client';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

const MailMessageComposeFormContainer = () => {
  const { handleStandardError } = useHandleError('message-compose');
  const { t } = useTranslationClient('message-compose');
  const router = useRouter();

  const methods = useMailMessageForm();

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await emailService.sendEmail(data);

      toast({ title: t('success'), variant: 'success' });
      router.push(routes.mail.list);
    } catch (error) {
      handleStandardError(error, { showToast: true });
    }
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <MailMessageComposeForm />
    </FormProvider>
  );
};

export default MailMessageComposeFormContainer;
