'use client';
import { ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

const LeftBar = () => {
  const router = useRouter();

  // const switchPreviousConv = () => {
  //   let conv = Number(params.id);
  //   if (conv > 1) {
  //     conv = conv - 1;
  //   }
  // };

  // const switchNextConv = () => {
  //   let conv = Number(params.id);
  //   if (conv < _conversations.length) {
  //     conv += 1;
  //   }
  // };

  return (
    <div className='flex flex-col items-center gap-10 h-full bg-slate-50 p-7'>
      <div className='flex flex-col gap-6 p-1 rounded-full border bg-white shadow-md'>
        <Button className='rounded-full' variant='link' size='icon' onClick={() => router.push(routes.mail.list)}>
          <ChevronLeft color='gray' />
        </Button>
      </div>
      <div className='flex flex-col gap-6 px-2 py-4 rounded-full border bg-white shadow-md'>
        <Button className='rounded-full' variant='link' size='icon'>
          <ChevronUp color='gray' />
        </Button>
        <Button className='rounded-full' variant='link' size='icon'>
          <ChevronDown color='gray' />
        </Button>
      </div>
    </div>
  );
};

export default LeftBar;
