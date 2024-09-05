import { getServerSession } from 'next-auth';

import { redirectToLogin } from '../utils';
import { debugRendering } from '@/lib/debug/debuggers';

type Props = {
  children: React.ReactNode;
};

export default async function AuthGuard({ children }: Props) {
  debugRendering('AuthGuard');
  const session = await getServerSession();
  if (!session) redirectToLogin();
  return <>{children}</>;
}
