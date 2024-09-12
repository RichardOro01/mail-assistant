import { ImapFlow } from 'imapflow';

export interface ImapInstance {
  email: string;
  connect: () => Promise<ImapFlow>;
}

export interface IMessage {
  uid: number;
  to: IMessagePerson[];
  from: IMessagePerson;
  read?: boolean;
  date?: Date;
  html: string | false;
  messageId?: string;
  subject?: string;
  text?: string;
  inReplyTo?: string;
}

export interface IMessagePerson {
  name?: string;
  address?: string;
}
