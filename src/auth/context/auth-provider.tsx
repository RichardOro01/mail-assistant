'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { debugRendering } from '@/lib/debug/debuggers';

interface AuthProviderProps {
  children: React.ReactElement;
}
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  debugRendering('AuthProvider');
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
