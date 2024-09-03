'use client';
import { createContext, useState } from 'react';
import MenuCard from '@/components/card/menu-card';
import { IConversation } from '@/types/email';
import { LayoutBaseProps } from '@/types/utils';

type MailSelectedContextType = {
  selectedMail: IConversation | undefined;
  setSelectedMail: React.Dispatch<React.SetStateAction<IConversation | undefined>>;
};

export const MailSelected = createContext<MailSelectedContextType>({
  selectedMail: undefined,
  setSelectedMail: () => {}
});

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
