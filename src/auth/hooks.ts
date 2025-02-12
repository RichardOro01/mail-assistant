import { usePathname, useRouter } from 'next/navigation';
import { RETURN_TO_PARAM } from './context';
import { routes } from '@/lib/routes';
import { useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';

export const useNavigateToLogin = () => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useMemo(() => (pathname ? `?${RETURN_TO_PARAM}=${pathname}` : ''), [pathname]);

  const navigateToLogin = useCallback(() => {
    const currentPath = pathname.split('?')[0];
    if (currentPath !== routes.login) router.push(`${routes.login}${params}`);
  }, [router, params, pathname]);

  return navigateToLogin;
};

export const useSessionCustom = (): ReturnType<typeof useSession> => {
  const session = useSession();

  if ((!session.data?.user || !Object.keys(session.data.user).length) && session.status === 'authenticated')
    return { ...session, data: null, status: 'unauthenticated' };

  return session;
};
