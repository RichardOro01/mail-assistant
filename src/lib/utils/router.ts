import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export function useRouterRefresh() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [resolve, setResolve] = useState<((value: unknown) => void) | null>(null);
  const [isTriggered, setIsTriggered] = useState(false);

  const refresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => {
      setResolve(() => resolve);
      startTransition(() => {
        router.refresh();
      });
    });
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (isTriggered && !isPending) {
      if (resolve) {
        resolve(null);

        setIsTriggered(false);
        setResolve(null);
      }
    }
    if (isPending) {
      setIsTriggered(true);
    }
  }, [isTriggered, isPending, resolve]);

  return { refresh, isRefreshing };
}
