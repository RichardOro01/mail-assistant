'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { PencilLine, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import MailListSummary from './mail-list-summary';

const MailListHeader: React.FC = () => {
  debugRendering('MailListHeader');

  const router = useRouter();

  const generateSummary = () => {};

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <div className='flex gap-5'>Messages</div>
      <div className='flex gap-6'>
        <MailListSummary />
        <button title='Add work' onClick={() => generateSummary()}>
          <Plus color='gray' size={18} />
        </button>
        <button title='Compose' onClick={() => router.push(routes.mail.message.compose)}>
          <PencilLine color='gray' size={18} />
        </button>
        <Search color='gray' size={18} />
      </div>
    </div>
  );
};

export default MailListHeader;
