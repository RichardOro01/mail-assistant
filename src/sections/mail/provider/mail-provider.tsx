'use client';

import { LayoutBaseProps } from '@/types/utils';
import React, { useCallback, useState } from 'react';
import { MailContext } from './mail-context';
import { IMessage, IMessageWithPriority } from '@/types/imap';
import { MessagePriorityType } from '@/types/ai';

const MailProvider: React.FC<LayoutBaseProps> = ({ children }) => {
  const [selectedMail, setSelectedMail] = useState<IMessage>();
  const [mails, setMails] = useState<IMessageWithPriority[]>([]);

  const updateMailPriority = useCallback((uid: number, priority: MessagePriorityType) => {
    setMails((prev) => prev.map((message) => (message.uid === uid ? { ...message, priority } : message)));
  }, []);

  return (
    <MailContext.Provider value={{ selectedMail, setSelectedMail, mails, setMails, updateMailPriority }}>
      {children}
    </MailContext.Provider>
  );
};

export default MailProvider;
