import { debugRendering } from '@/lib/debug';
import LoginView from '@/sections/login/login-view';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Mail Assistant - Login'
};

const LoginPage = async () => {
  debugRendering('LoginPage');
  return <LoginView />;
};

export default LoginPage;
