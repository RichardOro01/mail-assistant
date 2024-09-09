import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { translationServer } from '@/i18n';

const MailMessageComposeHeader: React.FC = async () => {
  debugRendering('MailMessageComposeHeader');
  const { t } = await translationServer('message-compose');
  return <h2 className='text-2xl font-semibold'>{t('title')}</h2>;
};

export default MailMessageComposeHeader;
