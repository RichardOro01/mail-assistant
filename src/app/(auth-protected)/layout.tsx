import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import AuthGuard from '@/auth/guard/auth-guard';
import { LayoutBaseProps } from '@/types/utils';

const LayoutProtected: React.FC<LayoutBaseProps> = ({ children }) => {
  debugRendering('LayoutProtected');
  return <AuthGuard>{children}</AuthGuard>;
};

export default LayoutProtected;
