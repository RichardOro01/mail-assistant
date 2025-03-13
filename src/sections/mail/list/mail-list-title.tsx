'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { useTranslationClient } from '@/i18n/client';

const MailListTitle: React.FC = () => {
  debugRendering('MailListTitle');

  const { t } = useTranslationClient('mail-list');
  return <div className='hidden sm:flex gap-5'>{t('title')}</div>;
};

export default MailListTitle;
