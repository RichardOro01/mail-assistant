'use client';

import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dot, PencilLine, Plus, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Shortcut } from '../types/shorcuts';
import { routes } from '@/lib/routes';

const MailListHeader: React.FC = () => {
  debugRendering('MailListHeader');

  const router = useRouter();
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: '1', name: 'Importantes', amount: 3 },
    { id: '2', name: 'Otros', amount: null }
  ]);

  const addShortcut = (name: string) => {
    setShortcuts([...shortcuts, { id: Date.now().toString(), name, amount: null }]);
  };

  return (
    <div className='flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10'>
      <div className='flex gap-5'>
        <TabsList className='flex text-gray-500 items-center gap-1'>
          {shortcuts.map((shortcut, index) => (
            <TabsTrigger
              key={shortcut.id}
              value={index.toString()}
              className='flex items-center data-[state=active]:text-black gap-1'>
              {shortcut.name}
              {index !== shortcuts.length - 1 && <Dot color='black' />}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      <div className='flex gap-6'>
        <button title='Add work' onClick={() => addShortcut('Trabajo')}>
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
