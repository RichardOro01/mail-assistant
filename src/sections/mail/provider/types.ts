import { IConversation } from '@/types/email';

export type MailContextType = {
  selectedMail: IConversation | undefined;
  setSelectedMail: React.Dispatch<React.SetStateAction<IConversation | undefined>>;
};
