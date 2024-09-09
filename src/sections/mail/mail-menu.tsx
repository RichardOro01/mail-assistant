'use client';

import { useMailContext } from '@/sections/mail/provider/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import MailMenuBottom from './mail-menu-bottom';
import { format } from 'date-fns';

const MailMenu: React.FC = () => {
  const { selectedMail: conversation } = useMailContext();

  const mail = conversation?.emails[0];

  const date = mail?.date ? format(mail?.date, 'dd/mm/yyyy hh:mm a') : '';

  return (
    <div
      className='h-screen w-[300px] flex flex-col justify-between border p-8 bg-slate-50 border-slate-100 lg:w-[400px]'
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 14px 17px inset'
      }}>
      <div className='grid grid-rows-3[1fr]'>
        <h3 className=' font-semibold text-lg self-center'>{mail?.from.name ?? mail?.from.email}</h3>
        <div className='flex items-center gap-4 text-sm'>
          <div className='w-16 h-16 rounded-full overflow-clip'>
            <Avatar className='object-cover rounded-md'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>{mail?.from.email}</p>
            <p className='opacity-60'>{date}</p>
          </div>
        </div>
        <div className='text-sm'>{conversation?.tags}</div>
      </div>
      <MailMenuBottom />
    </div>
  );
};

export default MailMenu;
