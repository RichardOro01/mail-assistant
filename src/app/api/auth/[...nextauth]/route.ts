import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { debugAuth } from '@/lib/debug';
import { routes } from '@/lib/routes';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials?.email && credentials.password) {
          const { email } = credentials;
          //   debugAuth(`Trying to auth: \x1b[34m${email}`);
          //   try {
          //     debugImap('Trying to auth with IMAP server');
          //     await trpcServer.authEmail({
          //       email,
          //       password
          //     });
          //     debugImap('\x1b[32mIMAP server auth success');
          //     debugAuth('Verifying user in DB');
          //     if (
          //       !(await prisma.users.findFirst({
          //         where: { email: credentials.email }
          //       }))
          //     ) {
          //       debugAuth('Creating user in DB');
          //       await prisma.users.create({ data: { email: credentials.email } });
          //     }
          //     debugAuth('\x1b[32mAuthentication success');
          //     return { id: credentials.email, email: credentials.email };
          //   } catch (error) {
          //     if (error instanceof TRPCError && error.code === 'UNAUTHORIZED') {
          //       debugImap('\x1b[31mIMAP server invalid credentials');
          //       throw new Error('invalid-credentials');
          //     }
          //     debugAuth('\x1b[31mCredentials Error: %O', error);
          //     throw new Error('something-wrong');
          //   }
          return { id: email, email: email };
        }
        debugAuth('Tried to auth without credentials');
        throw new Error('invalid-credentials');
      }
    })
  ],

  pages: {
    signIn: routes.login
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
