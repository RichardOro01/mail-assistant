// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
import { ISession } from './types';

declare module 'next-auth' {
  interface Session {
    user: ISession;
  }

  interface User extends ISession {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: ISession;
  }
}
