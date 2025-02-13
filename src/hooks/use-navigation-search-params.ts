import { useHolyRouter } from '@/components/top-loader/hook';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const useNavigationSearchParams = () => {
  const searchParams = useSearchParams();
  const router = useHolyRouter();
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

  const isSearching = useMemo(() => router.isLoading, [router]);

  return { searchParams, isSearching, changeSearchParams, removeSearchParams };
};
