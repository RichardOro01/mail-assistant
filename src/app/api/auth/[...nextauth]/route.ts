import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { debugAuth, debugImap } from '@/lib/debug';
import { routes } from '@/lib/routes';
import { imapService } from '@/services/imap';
import { getStandardErrorMessageServer } from '@/lib/error/server-functions';
import { sessionExpiresTime } from '@/auth/utils';

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
          const { email, password } = credentials;
          debugAuth(`Trying to auth: \x1b[34m${email}`);
          try {
            debugImap('Trying to auth with IMAP server');
            await imapService.auth(email, password);
            debugImap('\x1b[32mIMAP server auth success');
            debugAuth('Verifying user in DB');
            // TODO bd
            // if (
            //   !(await prisma.users.findFirst({
            //     where: { email: credentials.email }
            //   }))
            // ) {
            //   debugAuth('Creating user in DB');
            //   await prisma.users.create({ data: { email: credentials.email } });
            // }
            debugAuth('\x1b[32mAuthentication success');
            return { id: credentials.email, email: credentials.email };
          } catch (error) {
            const message = await getStandardErrorMessageServer(error, 'login');
            throw new Error(message);
          }
        }
        debugAuth('Tried to auth without credentials');
        throw new Error('credentials_required');
      }
    })
  ],
  session: {
    maxAge: sessionExpiresTime
  },
  pages: {
    signIn: routes.login
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
