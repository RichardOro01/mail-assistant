import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailMessageComposeCard from './mail-message-compose-card';

const MailMessageComposeView: React.FC = () => {
  debugRendering('MailMessageComposeView');
  return <MailMessageComposeCard />;
};

export default MailMessageComposeView;
