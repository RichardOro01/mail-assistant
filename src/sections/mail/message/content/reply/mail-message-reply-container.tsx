import React, { RefObject, useEffect } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { useMailMessageReplyForm } from './mail-message-hooks';
import { emailService } from '@/services/email';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useHandleError } from '@/lib/error/hooks';
import { useTranslationClient } from '@/i18n/client';
import { routes } from '@/lib/routes';
import FormProvider from '@/components/form-hook/form-provider';
import MailMessageReplyForm from './mail-message-reply-form';
import { IMessage } from '@/types/imap';

interface MailMessageReplyContainerProps {
  hidden: boolean;
  message: IMessage;
  divRef: RefObject<HTMLDivElement>;
}

const MailMessageReplyContainer: React.FC<MailMessageReplyContainerProps> = ({ hidden, message, divRef }) => {
  debugRendering('MailMessageReplyContainer');

  const { t } = useTranslationClient('message-reply');
  const methods = useMailMessageReplyForm({ defaultTo: message?.from.address ?? '' });
  const { handleStandardError } = useHandleError();
  const { handleSubmit, setFocus } = methods;
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await emailService.replyEmail({
        text: data.text,
        messageId: message?.messageId ?? '',
        replyTo: data.to,
        subject: message?.subject ?? ''
      });

      toast({ title: t('success'), variant: 'success' });
      router.push(routes.mail.list);
    } catch (error) {
      handleStandardError(error, { showToast: true });
    }
  });

  useEffect(() => {
    if (!hidden) {
      setTimeout(() => {
        divRef.current?.scrollTo({ top: divRef.current.scrollHeight, behavior: 'smooth' });
        setFocus('text');
      }, 100);
    }
  }, [hidden, setFocus, divRef]);

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <MailMessageReplyForm {...{ hidden }} />
    </FormProvider>
  );
};

export default MailMessageReplyContainer;
