import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { debugAuth, debugImap } from '@/lib/debug';
import { routes } from '@/lib/routes';
import { getStandardErrorMessageServer } from '@/lib/error/server-functions';
import { sessionExpiresTime } from '@/auth/utils';
import { emailService } from '@/services/email';

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
            await emailService.auth(email, password);
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
  },
  callbacks: {
    jwt: ({ user, token }) => {
      if (user && token) {
        token.email = user.email;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token && session) {
        session.user.email = token.email ?? '';
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
