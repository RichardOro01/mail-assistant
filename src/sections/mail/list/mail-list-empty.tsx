'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import EmailIllustration from '@/assets/illustrations/email-illustration';
import { useTranslationClient } from '@/i18n/client';

const MailListEmpty: React.FC = () => {
  debugRendering('MailListEmpty');
  const { t } = useTranslationClient('mail-list');
  return (
    <div className='flex flex-col w-full items-center gap-4 mt-14'>
      <EmailIllustration size={200} />
      <p className='text-lg text-gray-500 font-semibold'>{t('empty')}</p>
    </div>
  );
};

export default MailListEmpty;
