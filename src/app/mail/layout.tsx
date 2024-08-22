"use client";
import { createContext, useState } from "react";
import MenuCard from "@/components/card/menu-card";
import { IConversation } from "@/types/email";
import { LayoutBaseProps } from "@/types/utils";
import { useRouter } from "next/navigation";

type MailSelectedContextType = {
  selectedMail: IConversation | undefined;
  setSelectedMail: React.Dispatch<
    React.SetStateAction<IConversation | undefined>
  >;
  selectConversation: (id: string) => void;
};

export const MailSelected = createContext<MailSelectedContextType>({
  selectedMail: undefined,
  setSelectedMail: () => {},
  selectConversation: () => {},
});

const CardLayout = ({ children }: LayoutBaseProps) => {
  const [selectedMail, setSelectedMail] = useState<IConversation | undefined>();
  const router = useRouter();

  const selectConversation = (id: string) => {
    router.replace(`/mail/mail-content/${id}`);
  };

  return (
    <MailSelected.Provider
      value={{ selectedMail, setSelectedMail, selectConversation }}
    >
      <div className="flex justify-between">
        <main className="flex max-h-screen overflow-y-auto">{children}</main>
        <MenuCard conversation={selectedMail} />
      </div>
    </MailSelected.Provider>
  );
};

export default CardLayout;
