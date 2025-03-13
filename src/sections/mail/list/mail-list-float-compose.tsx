'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FloatButton from '@/components/ui/float-button';
import Link from 'next/link';
import { routes } from '@/lib/routes';
import { PencilLine } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';

const MailListFloatCompose: React.FC = () => {
  debugRendering('MailListFloatCompose');

  const { t } = useTranslationClient('mail-list');

  return (
    <Link href={routes.mail.message.compose} className='content-center flex sm:hidden'>
      <FloatButton aria-label={t('compose')}>
        <PencilLine color='gray' size={24} />
      </FloatButton>
    </Link>
  );
};

export default MailListFloatCompose;
