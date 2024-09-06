'use client';

import { LayoutBaseProps } from '@/types/utils';
import React, { useState } from 'react';
import { IConversation } from '@/types/email';
import { MailContext } from './mail-context';

const MailProvider: React.FC<LayoutBaseProps> = ({ children }) => {
  const [selectedMail, setSelectedMail] = useState<IConversation>();

  return <MailContext.Provider value={{ selectedMail, setSelectedMail }}>{children}</MailContext.Provider>;
};

export default MailProvider;
