'use client';

import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import { Button } from '@/components/ui/button';
import { useMailContext } from '@/sections/mail/provider/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { signOut } from 'next-auth/react';

const MailMenu: React.FC = () => {
  const { selectedMail: conversation } = useMailContext();
  return (
    <div
      className='h-screen w-[300px] flex flex-col justify-between border p-8 bg-slate-50 border-slate-100 lg:w-[400px]'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 14px 17px inset'
      }}>
      <div className='grid grid-rows-3[1fr]'>
        <h3 className=' font-semibold text-lg self-center'>{conversation?.emails[0].from.name}</h3>
        <div className='flex items-center text-sm'>
          <div className='w-16 h-16 rounded-full overflow-clip'>
            <Avatar className='object-cover rounded-md'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>{conversation?.emails[0].from.name}</p>
            <p className='opacity-60'>{conversation?.emails[0].date ? conversation?.emails[0].date.getDate() : ''}</p>
          </div>
        </div>
        <div className='text-sm'>{conversation?.tags}</div>
      </div>
      <div className='flex gap-2 justify-between'>
        <LanguageSwitcher />
        <Button onClick={() => signOut()} variant='destructive'>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default MailMenu;
