export interface IEmail {
  id: string;
  to: IUser[];
  from: IUser;
  date?: Date;
  html: string;
  text: string;
}

export interface IConversation {
  read: boolean;
  id: string;
  subject: string;
  emails: IEmail[];
  tags: string[];
}

export interface IUser {
  name: string | null;
  email: string | null;
}
