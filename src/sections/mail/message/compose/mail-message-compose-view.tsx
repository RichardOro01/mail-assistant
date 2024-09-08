import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailMessageComposeCard from './mail-message-compose-card';
import MailMessageComposeHeader from './mail-message-compose-header';

const MailMessageComposeView: React.FC = () => {
  debugRendering('MailMessageComposeView');
  return (
    <div className='flex flex-col gap-4 px-4 py-8 w-full'>
      <MailMessageComposeHeader />
      <MailMessageComposeCard />
    </div>
  );
};

export default MailMessageComposeView;
