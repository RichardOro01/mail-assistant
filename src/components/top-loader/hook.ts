import { startHolyLoader, stopHolyLoader } from 'holy-loader';
import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export const useHolyRouter = () => {
  const { push: oldPush, replace: oldReplace, ...rest } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const getFullPathName = useCallback(() => {
    return `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  }, [pathname, searchParams]);

  const isCurrentPage = useCallback(
    (url: string) => {
      return getFullPathName() === url || `?${searchParams.toString()}` === url;
    },
    [getFullPathName, searchParams]
  );

  const push = useCallback(
    (...params: Parameters<typeof oldPush>) => {
      if (!isCurrentPage(params[0])) {
        startHolyLoader();
        setIsLoading(true);
        return oldPush(...params);
      }
    },
    [oldPush, isCurrentPage]
  );

  const replace = useCallback(
    (...params: Parameters<typeof oldReplace>) => {
      if (!isCurrentPage(params[0])) {
        setIsLoading(true);
        startHolyLoader();
        return oldReplace(...params);
      }
    },
    [oldReplace, isCurrentPage]
  );

  useEffect(() => {
    setIsLoading(false);
    stopHolyLoader();
  }, [pathname, searchParams]);

  return { push, replace, isLoading, ...rest };
};
