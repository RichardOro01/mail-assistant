'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoginRequest } from './types';
import { useTranslationClient } from '@/i18n/client';
import LoginForm from './login-form';
import { debugRendering } from '@/lib/debug';
import FormProvider from '@/components/form-hook/form-provider';
import { useLoginForm } from './login-hooks';
import { useToast } from '@/hooks/use-toast';
import { routes } from '@/lib/routes';

const LoginFormContainer = () => {
  debugRendering('LoginFormContainer');
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams?.get('returnTo');
  const { t } = useTranslationClient('login');

  const { toast } = useToast();

  const methods = useLoginForm();
  const { handleSubmit } = methods;
  const onSubmit = handleSubmit(async ({ email, password }: LoginRequest) => {
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      });
      if (typeof res?.error === 'string') {
        toast({
          variant: 'destructive',
          title: t('failed-title'),
          description: t(res.error)
        });
      } else if (res?.status === 200) {
        router.replace(returnTo || routes.mail.list);
      } else {
        toast({
          variant: 'destructive',
          title: t('failed-title'),
          description: t('something-wrong')
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: t('failed-title'),
        description: t('something-wrong')
      });
    }
  });

  return (
    <FormProvider {...{ methods, onSubmit }}>
      <LoginForm />;
    </FormProvider>
  );
};

export default LoginFormContainer;
