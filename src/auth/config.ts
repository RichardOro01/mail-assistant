import { getServerSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { debugAuth, debugImap } from '@/lib/debug';
import { routes } from '@/lib/routes';
import { getStandardErrorMessageServer } from '@/lib/error/server-functions';
import { sessionExpiresTime } from '@/auth/utils';
import { emailService } from '@/services/email';
import prisma from '@/lib/prisma';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

export const authOptions = {
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
            let user = await prisma.users.findUnique({ where: { email } });
            if (!user) {
              user = await prisma.users.create({ data: { email } });
            }
            debugAuth('\x1b[32mAuthentication success');
            return { id: user.id, email: user.email };
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
        token.user = {
          id: user.id,
          email: user.email!,
          name: user.name,
          image: user.image
        };
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token && session && session.user) {
        session.user.id = token.user.id;
        session.user.email = token.user.email;
      }
      return session;
    }
  }
} satisfies NextAuthOptions;

export function auth(
  ...args: [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
