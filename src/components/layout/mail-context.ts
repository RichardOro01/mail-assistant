import { createContext } from 'react';
import { IConversation } from '@/types/email';

type MailSelectedContextType = {
  selectedMail: IConversation | undefined;
  setSelectedMail: React.Dispatch<React.SetStateAction<IConversation | undefined>>;
};

export const MailSelected = createContext<MailSelectedContextType>({
  selectedMail: undefined,
  setSelectedMail: () => {}
});
