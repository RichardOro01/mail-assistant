import { translationServer } from '@/i18n';
import { debugRendering } from '@/lib/debug';
import LoginFormContainer from '@/sections/login/login-form-container';
import React from 'react';

const LoginPage = async () => {
  debugRendering('LoginPage');
  const { t } = await translationServer('login');
  return (
    <section className='flex justify-center items-center flex-1 '>
      <div className='border-2 border-solid rounded border-primary-900 dark:border-primary-600 px-8 py-6'>
        <h1 className='text-center mb-8'>{t('title')}</h1>
        <LoginFormContainer />
      </div>
    </section>
  );
};

export default LoginPage;
