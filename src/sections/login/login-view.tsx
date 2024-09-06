import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import LoginFormContainer from './login-form-container';
import { translationServer } from '@/i18n';

const LoginView: React.FC = async () => {
  debugRendering('LoginView');
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

export default LoginView;
