import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { routes } from '@/lib/routes';
import MailOpenMenuButton from '../../mail-open-menu-button';
import { Skeleton } from '@/components/ui/skeleton';

const MailMessageContentSkeleton: React.FC = () => {
  debugRendering('MailMessageContentSkeleton');
  return (
    <>
      <div className='flex flex-col md:flex-row justify-between gap-8'>
        <div className='flex flex-col md:flex-row gap-4 items-center'>
          <div className='flex justify-between w-full md:w-fit'>
            <Link href={routes.mail.list}>
              <Button className='rounded-full shadow-md' variant='link' size='icon'>
                <ChevronLeft color='gray' />
              </Button>
            </Link>
            <MailOpenMenuButton className='md:hidden flex' />
          </div>
          <h2 className='text-xl md:text-2xl font-semibold'>{<Skeleton className='w-96 h-6' />}</h2>
        </div>
        <div className='flex ml-2 gap-4 items-center justify-end'>
          <MailOpenMenuButton className='hidden md:flex' />
        </div>
      </div>
      <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px] overflow-auto'>
        <div className='flex flex-col mx-5 my-3'>
          <div className='flex flex-col gap-5'>
            <div className='flex justify-between w-full'>
              <h2 className='font-semibold text-lg'>
                <Skeleton className='w-56 h-5' />
              </h2>
              <p className='opacity-50 text-lg'>
                <Skeleton className='w-56 h-5' />
              </p>
            </div>
            <div className='mt-2 text-base flex flex-col gap-4 w-full'>
              <Skeleton className='w-11/12 h-4' />
              <Skeleton className='w-10/12 h-4' />
              <Skeleton className='w-full h-4' />
              <Skeleton className='w-11/12 h-4' />
              <Skeleton className='w-1/2 h-4' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailMessageContentSkeleton;
