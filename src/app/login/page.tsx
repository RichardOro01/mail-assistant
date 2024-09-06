import { debugRendering } from '@/lib/debug';
import LoginView from '@/sections/login/login-view';
import React from 'react';

const LoginPage = async () => {
  debugRendering('LoginPage');
  return <LoginView />;
};

export default LoginPage;
