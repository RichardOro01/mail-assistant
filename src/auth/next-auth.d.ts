// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }

  interface User extends IUser {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: IUser;
  }
}

interface IUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
}
