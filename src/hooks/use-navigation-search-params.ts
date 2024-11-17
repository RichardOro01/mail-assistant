import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useNavigationSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamsObject = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);
  const pathname = usePathname();

  const changeSearchParams = useCallback(
    (key: string, value: string) => {
      searchParamsObject.set(key, value);
      const searchParamsString = searchParamsObject.toString();
      const searchParamsStringWithQuestionMark = searchParamsString ? `?${searchParamsString}` : '';
      router.push(`${searchParamsStringWithQuestionMark}`);
    },
    [searchParamsObject, router]
  );

  const removeSearchParams = useCallback(
    (key: string) => {
      searchParamsObject.delete(key);
      const searchParamsString = searchParamsObject.toString();
      const searchParamsStringWithQuestionMark = searchParamsString ? `?${searchParamsString}` : '';
      router.push(`${pathname}${searchParamsStringWithQuestionMark}`);
    },
    [searchParamsObject, router, pathname]
  );

  return { searchParams, changeSearchParams, removeSearchParams };
};
