import { getServerSession } from 'next-auth';

import { redirectToLogin } from '../utils';
import { debugRendering } from '@/lib/debug/debuggers';
import { hasImapInstance } from '@/server/imap';

type Props = {
  children: React.ReactNode;
};

export default async function AuthGuard({ children }: Props) {
  debugRendering('AuthGuard');
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email || !hasImapInstance(session.user.email)) redirectToLogin();
  return <>{children}</>;
}
