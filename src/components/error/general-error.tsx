'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { CircleX } from 'lucide-react';
import { Button } from '../ui/button';
import { useHolyRouter } from '../top-loader/hook';

const GeneralError: React.FC = () => {
  debugRendering('General-error');
  const router = useHolyRouter();
  return (
    <div className='flex flex-col gap-2 flex-1 w-full h-full justify-center items-center'>
      <CircleX size={40} />
      <h2 className='text-2xl font-medium'>Error</h2>
      <Button variant='outline' className='w-fit' onClick={() => router.refresh()}>
        Reload
      </Button>
    </div>
  );
};

export default GeneralError;
