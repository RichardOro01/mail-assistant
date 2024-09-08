import { useTranslationClient } from '@/i18n/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ISendEmailRequest } from '@/types/smtp';

export const useMailMessageForm = () => {
  const { t } = useTranslationClient('mail-message');
  const defaultValues: ISendEmailRequest = {
    to: '',
    subject: '',
    text: ''
  };

  const schema: z.ZodSchema<ISendEmailRequest> = z.object({
    to: z.string().min(1, t('email-required')).email(t('email-invalid')),
    subject: z.string(),
    text: z.string()
  });

  const methods = useForm({ resolver: zodResolver(schema), defaultValues });
  return methods;
};
