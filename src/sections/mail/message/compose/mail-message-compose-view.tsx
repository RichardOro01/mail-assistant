import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailMessageCard from '../mail-message-card';

const MailMessageComposeView: React.FC = () => {
  debugRendering('MailMessageComposeView');
  return <MailMessageCard />;
};

export default MailMessageComposeView;
