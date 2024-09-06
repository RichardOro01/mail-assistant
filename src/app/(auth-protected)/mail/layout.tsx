'use client';
import { useState } from 'react';
import MenuCard from '@/components/card/menu-card';
import { IConversation } from '@/types/email';
import { LayoutBaseProps } from '@/types/utils';
import { MailSelected } from '@/components/layout/mail-context';

const CardLayout = ({ children }: LayoutBaseProps) => {
  const [selectedMail, setSelectedMail] = useState<IConversation | undefined>();

  return (
    <MailSelected.Provider value={{ selectedMail, setSelectedMail }}>
      <div className='flex justify-between'>
        <main className='flex max-h-screen overflow-y-auto'>{children}</main>
        <MenuCard conversation={selectedMail} />
      </div>
    </MailSelected.Provider>
  );
};

export default CardLayout;
