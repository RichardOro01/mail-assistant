import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import AuthGuard from '@/auth/guard/auth-guard';
import { LayoutBaseProps } from '@/types/utils';
import AuthGuardClient from '@/auth/guard/auth-guard-client';

const LayoutProtected: React.FC<LayoutBaseProps> = ({ children }) => {
  debugRendering('LayoutProtected');
  return (
    <AuthGuard>
      <AuthGuardClient>{children}</AuthGuardClient>
    </AuthGuard>
  );
};

export default LayoutProtected;
