"use client";
import { createContext, useState } from "react";
import MenuCard from "@/components/card/menu-card";
import { IConversation } from "@/types/email";
import { LayoutBaseProps } from "@/types/utils";

type MailSelectedContextType = {
  selectedMail: IConversation | null;
  setSelectedMail: React.Dispatch<React.SetStateAction<IConversation | null>>;
};

export const MailSelected = createContext<MailSelectedContextType>({
  selectedMail: null,
  setSelectedMail: () => {},
});

const CardLayout = ({ children }: LayoutBaseProps) => {
  const [selectedMail, setSelectedMail] = useState<IConversation | null>(null);

  return (
    <MailSelected.Provider value={{ selectedMail, setSelectedMail }}>
      <div className="flex justify-between">
        {children}
        <MenuCard conversation={selectedMail} />
      </div>
    </MailSelected.Provider>
  );
};

export default CardLayout;
