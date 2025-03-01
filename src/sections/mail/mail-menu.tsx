'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import MailMenuBottom from './mail-menu-bottom';
import { useSessionCustom } from '@/auth/hooks';

const MailMenu: React.FC = () => {
  const { data } = useSessionCustom();

  return (
    <div className='h-full flex flex-col justify-between w-full'>
      <div className='grid grid-rows-3[1fr]'>
        <h3 className=' font-semibold text-lg self-center'></h3>
        <div className='flex items-center gap-4 text-sm'>
          <div className='w-16 h-16 rounded-full overflow-clip'>
            <Avatar className='object-cover rounded-md'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='font-semibold'>{data?.user.name || 'Richard Oropesa'}</p>
            <p className='opacity-60'> {data?.user.email}</p>
          </div>
        </div>
      </div>
      <MailMenuBottom />
    </div>
  );
};

export default MailMenu;
