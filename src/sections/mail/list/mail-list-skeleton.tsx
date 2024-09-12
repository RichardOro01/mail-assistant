import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Skeleton } from '@/components/ui/skeleton';

interface MailListSkeletonProps {
  rows?: number;
}

const MailListSkeleton: React.FC<MailListSkeletonProps> = ({ rows }) => {
  debugRendering('MailListSkeleton');
  return (
    <div className='flex flex-col px-4'>
      {Array.from({ length: rows ?? 20 }).map((_, index) => (
        <div key={index} className='flex items-center justify-between gap-6 py-3'>
          <Skeleton className='w-[30%] h-[20px] rounded-full ' />
          <Skeleton className='w-[60%] h-[20px] rounded-full' />
          <Skeleton className='w-[10%] h-[20px] rounded-full' />
        </div>
      ))}
    </div>
  );
};

export default MailListSkeleton;
