'use client';

import { refreshSession } from '@/server/actions';
import { LayoutBaseProps } from '@/types/utils';
import React, { useEffect } from 'react';

let refreshTimer: NodeJS.Timeout | undefined;

const AuthGuardClient = ({ children }: LayoutBaseProps) => {
  useEffect(() => {
    if (!refreshTimer) {
      refreshTimer = setInterval(
        () => {
          refreshSession();
        },
        60 * 60 * 1000
      );
    }

    return () => {
      clearInterval(refreshTimer);
      refreshTimer = void 0;
    };
  }, []);

  return <>{children}</>;
};

export default AuthGuardClient;
