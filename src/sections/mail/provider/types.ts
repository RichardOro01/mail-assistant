import { IConversation } from '@/types/email';

export type MailContextType = {
  selectedMail: IConversation | undefined;
  mails: IConversation[];
  setSelectedMail: React.Dispatch<React.SetStateAction<IConversation | undefined>>;
  setMails: React.Dispatch<React.SetStateAction<IConversation[]>>;
};
