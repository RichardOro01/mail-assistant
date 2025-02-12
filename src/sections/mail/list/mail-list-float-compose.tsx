import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FloatButton from '@/components/ui/float-button';
import Link from 'next/link';
import { translationServer } from '@/i18n';
import { routes } from '@/lib/routes';
import { PencilLine } from 'lucide-react';

const MailListFloatCompose: React.FC = async () => {
  debugRendering('MailListFloatCompose');

  const { t } = await translationServer('mail-list');

  return (
    <Link href={routes.mail.message.compose} className='content-center flex sm:hidden'>
      <FloatButton aria-label={t('compose')}>
        <PencilLine color='gray' size={24} />
      </FloatButton>
    </Link>
  );
};

export default MailListFloatCompose;
