'use client';

import { LayoutBaseProps } from '@/types/utils';
import React, { useCallback, useState } from 'react';
import { MailContext } from './mail-context';
import { IMessage, IMessageWithPriority } from '@/types/imap';
import { MessagePriorityType } from '@/types/ai';

const MailProvider: React.FC<LayoutBaseProps> = ({ children }) => {
  const [selectedMail, setSelectedMail] = useState<IMessage>();
  const [selectedMailsCheckbox, setSelectedMailsCheckbox] = useState<IMessage[]>([]);
  const [mails, setMails] = useState<IMessageWithPriority[]>([]);

  const updateMailPriority = useCallback((uid: number, priority: MessagePriorityType) => {
    setMails((prev) => prev.map((message) => (message.uid === uid ? { ...message, priority } : message)));
  }, []);

  const addSelectedMailCheckbox = useCallback(
    (message: IMessage) => {
      if (!selectedMailsCheckbox.find(({ uid }) => uid === message.uid))
        setSelectedMailsCheckbox((prev) => [...prev, message].sort(({ uid: uid1 }, { uid: uid2 }) => uid2 - uid1));
    },
    [selectedMailsCheckbox]
  );

  const removeSelectedMailCheckbox = useCallback((message: IMessage) => {
    setSelectedMailsCheckbox((prev) => prev.filter(({ uid }) => uid !== message.uid));
  }, []);

  const isSelectedMailCheckbox = useCallback(
    (message: IMessage) => {
      return !!selectedMailsCheckbox.find(({ uid }) => uid === message.uid);
    },
    [selectedMailsCheckbox]
  );

  return (
    <MailContext.Provider
      value={{
        selectedMail,
        setSelectedMail,
        mails,
        setMails,
        updateMailPriority,
        selectedMailsCheckbox,
        isSelectedMailCheckbox,
        addSelectedMailCheckbox,
        removeSelectedMailCheckbox
      }}>
      {children}
    </MailContext.Provider>
  );
};

export default MailProvider;
