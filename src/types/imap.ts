import Imap from "imap";

export interface ImapWithConfig extends Imap {
  _config: {
    localAddress: unknown;
    socket: unknown;
    socketTimeout: number;
    host: string;
    port: number;
    tls: boolean;
    tlsOptions: unknown;
    autotls: unknown;
    user: string;
    password: string;
    xoauth: unknown;
    xoauth2: unknown;
    connTimeout: number;
    authTimeout: number;
    keepalive: boolean;
  };
}

export interface IMessageInfoImap {
  from?: IMessagePerson[];
  to?: IMessagePerson[];
  date?: Date;
  subject?: string;
  html: string | false;
  text?: string;
}

export interface IMessagePerson {
  name?: string;
  address?: string;
}
