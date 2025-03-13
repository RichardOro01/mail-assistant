'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import LoginFormContainer from './login-form-container';
import { useTranslationClient } from '@/i18n/client';

const LoginView: React.FC = () => {
  debugRendering('LoginView');
  const { t } = useTranslationClient('login');
  return (
    <section className='flex justify-center items-center flex-1 '>
      <div className='border-2 border-solid rounded border-primary-900 dark:border-primary-600 px-8 py-6'>
        <h1 className='text-center mb-8'>{t('title')}</h1>
        <LoginFormContainer />
      </div>
    </section>
  );
};

export default LoginView;
