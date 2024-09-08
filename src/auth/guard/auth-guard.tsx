import { getServerSession } from 'next-auth';

import { redirectToLogin } from '../utils';
import { debugRendering } from '@/lib/debug/debuggers';
import { hasEmailInstance } from '@/server/email';

type Props = {
  children: React.ReactNode;
};

export default async function AuthGuard({ children }: Props) {
  debugRendering('AuthGuard');
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email || !hasEmailInstance(session.user.email)) redirectToLogin();
  return <>{children}</>;
}
