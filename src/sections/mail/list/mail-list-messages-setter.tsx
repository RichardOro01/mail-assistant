'use client';

import React, { useEffect } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { LayoutBaseProps } from '@/types/utils';
import { IMessage } from '@/types/imap';
import { useMailContext } from '../provider/hooks';

interface MailListMessagesSetterProps extends LayoutBaseProps {
  messages: IMessage[];
}

const MailListMessagesSetter: React.FC<MailListMessagesSetterProps> = ({ children, messages }) => {
  debugRendering('MailListMessagesSetter');
  const { setMails } = useMailContext();

  useEffect(() => {
    setMails(messages);
  }, [messages, setMails]);

  return <>{children}</>;
};

export default MailListMessagesSetter;
