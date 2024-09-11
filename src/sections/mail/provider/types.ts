import { IMessage } from '@/types/imap';

export type MailContextType = {
  selectedMail: IMessage | undefined;
  mails: IMessage[];
  setSelectedMail: React.Dispatch<React.SetStateAction<IMessage | undefined>>;
  setMails: React.Dispatch<React.SetStateAction<IMessage[]>>;
};
