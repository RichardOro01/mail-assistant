import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';

const MailMessageComposeHeader: React.FC = () => {
  debugRendering('MailMessageComposeHeader');
  return <h2 className='text-2xl font-semibold'>New message</h2>;
};

export default MailMessageComposeHeader;
