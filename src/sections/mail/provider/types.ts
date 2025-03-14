import { MessagePriorityType } from '@/types/ai';
import { IMessage, IMessageWithPriority } from '@/types/imap';

export type MailContextType = {
  selectedMail: IMessage | undefined;
  selectedMailsCheckbox: IMessage[];
  mails: IMessageWithPriority[];
  setSelectedMail: React.Dispatch<React.SetStateAction<IMessage | undefined>>;
  setMails: React.Dispatch<React.SetStateAction<IMessage[]>>;
  updateMailPriority: (uid: number, priority: MessagePriorityType) => void;
  isSelectedMailCheckbox: (message: IMessage) => boolean;
  addSelectedMailCheckbox: (message: IMessage) => void;
  removeSelectedMailCheckbox: (message: IMessage) => void;
};
