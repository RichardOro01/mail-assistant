'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MailMenu from './mail-menu';
import { Menu } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';
import { twMerge } from 'tailwind-merge';

interface MailOpenMenuButtonProps {
  className?: string;
}

const MailOpenMenuButton: React.FC<MailOpenMenuButtonProps> = ({ className }) => {
  debugRendering('MailMenuButton');

  const { t } = useTranslationClient('mail-list');

  return (
    <Sheet>
      <SheetTrigger className={twMerge('flex items-center 2xl:hidden', className)} title={t('menu')}>
        <Menu color='gray' />
      </SheetTrigger>
      <SheetContent className='bg-slate-50'>
        <SheetHeader className='h-full'>
          <SheetTitle></SheetTitle>
          <SheetDescription className='h-full'>
            <MailMenu />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MailOpenMenuButton;
