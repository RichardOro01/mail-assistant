import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MailMenu from './mail-menu';
import { Menu } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { translationServer } from '@/i18n';

const MailMenuButton: React.FC = async () => {
  debugRendering('MailMenuButton');

  const { t } = await translationServer('mail-list');

  return (
    <Sheet>
      <SheetTrigger className='flex items-center 2xl:hidden'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Menu color='gray' />
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('menu')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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

export default MailMenuButton;
