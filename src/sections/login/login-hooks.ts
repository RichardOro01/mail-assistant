import { useTranslationClient } from '@/i18n/client';
import { z } from 'zod';
import { LoginRequest } from './types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useLoginForm = () => {
  const { t } = useTranslationClient('login');
  const defaultValues: LoginRequest = {
    email: '',
    password: ''
  };

  const LoginSchema = z.object({
    email: z.string().min(1, t('email-required')).email(t('email-invalid')),
    password: z.string().min(1, 'password-required')
  });

  const methods = useForm({ resolver: zodResolver(LoginSchema), defaultValues });
  return methods;
};
