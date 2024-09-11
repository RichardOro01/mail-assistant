import { ImapFlow } from 'imapflow';
import { ParsedMail } from 'mailparser';

export interface ImapInstance {
  email: string;
  connect: () => Promise<ImapFlow>;
}

export interface IMessage extends Omit<ParsedMail, 'to' | 'from'> {
  uid: number;
  to: IMessagePerson[];
  from: IMessagePerson;
  read?: boolean;
}

export interface IMessagePerson {
  name?: string;
  address?: string;
}
