import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useTranslationClient } from '@/i18n/client';

const MailMenuBottom: React.FC = () => {
  debugRendering('MailMenuBottom');
  const { t } = useTranslationClient('mail-menu');
  return (
    <div className='flex gap-2 justify-between'>
      <LanguageSwitcher />
      <Button onClick={() => signOut()} variant='destructive'>
        {t('logout')}
      </Button>
    </div>
  );
};

export default MailMenuBottom;
