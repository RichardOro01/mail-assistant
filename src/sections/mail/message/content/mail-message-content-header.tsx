import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Check, Clock, Trash } from 'lucide-react';

interface MailMessageContentHeaderProps {
  subject: string;
}

const MailMessageContentHeader: React.FC<MailMessageContentHeaderProps> = ({ subject }) => {
  debugRendering('MailMessageContentHeader');
  return (
    <div className='flex justify-between'>
      <h2 className='text-2xl font-semibold'>{subject}</h2>
      <div className='flex ml-2 gap-4 items-center'>
        <button title='check'>
          <Check color='gray' size={18} />
        </button>
        <Clock color='gray' size={18} />
        <Trash color='gray' size={18} />
      </div>
    </div>
  );
};

export default MailMessageContentHeader;
