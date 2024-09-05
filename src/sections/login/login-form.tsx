import React from 'react';
import { User, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FormInputPassword from '@/components/form-hook/form-input-password';
import FormInput from '@/components/form-hook/form-input';
import { useTranslationClient } from '@/i18n/client';
import { debugRendering } from '@/lib/debug';
import { useFormContext } from 'react-hook-form';
import { LoginRequest } from './types';

const LoginForm: React.FC = () => {
  debugRendering('LoginForm');

  const { t } = useTranslationClient('login');

  const {
    formState: { isSubmitting }
  } = useFormContext<LoginRequest>();

  return (
    <div className='flex flex-col gap-4'>
      <FormInput name='email' startAdornment={<User />} />
      <FormInputPassword name='password' startAdornment={<Lock />} />
      <Button variant='secondary' loading={isSubmitting} className='w-full'>
        {t('submit-button')}
      </Button>
    </div>
  );
};

export default LoginForm;
