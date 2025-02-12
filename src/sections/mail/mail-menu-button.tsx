import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import MailMenu from './mail-menu';
import { Menu } from 'lucide-react';

const MailMenuButton: React.FC = () => {
  debugRendering('MailMenuButton');
  return (
    <Sheet>
      <SheetTrigger className='flex items-center 2xl:hidden'>
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

export default MailMenuButton;
