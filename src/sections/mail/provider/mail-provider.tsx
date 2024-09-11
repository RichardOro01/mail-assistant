'use client';

import { LayoutBaseProps } from '@/types/utils';
import React, { useState } from 'react';
import { MailContext } from './mail-context';
import { IMessage } from '@/types/imap';

const MailProvider: React.FC<LayoutBaseProps> = ({ children }) => {
  const [selectedMail, setSelectedMail] = useState<IMessage>();
  const [mails, setMails] = useState<IMessage[]>([]);

  return (
    <MailContext.Provider value={{ selectedMail, setSelectedMail, mails, setMails }}>{children}</MailContext.Provider>
  );
};

export default MailProvider;
