import { ImapFlow } from 'imapflow';

export interface ImapFlowWithOptions extends ImapFlow {
  options: {
    host: string;
    port: number;
    auth: { user: string; pass: string };
  };
}

export interface IMessageInfoImap {
  from?: IMessagePerson[];
  to?: IMessagePerson[];
  date?: Date;
  subject?: string;
  html: string | false;
  text?: string;
  id?: string;
}

export interface IMessagePerson {
  name?: string;
  address?: string;
}
