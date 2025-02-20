'use client';

import React, { useEffect } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { LayoutBaseProps } from '@/types/utils';
import { IMessageWithPriority } from '@/types/imap';
import { useMailContext } from '../provider/hooks';

interface MailListMessagesSetterProps extends LayoutBaseProps {
  messagesWithPriorities: IMessageWithPriority[];
}

const MailListMessagesSetter: React.FC<MailListMessagesSetterProps> = ({ children, messagesWithPriorities }) => {
  debugRendering('MailListMessagesSetter');
  const { setMails } = useMailContext();

  useEffect(() => {
    setMails(messagesWithPriorities);
  }, [messagesWithPriorities, setMails]);

  return <>{children}</>;
};

export default MailListMessagesSetter;
