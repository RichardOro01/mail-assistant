import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { redirect } from 'next/navigation';
import { routes } from '@/lib/routes';

const ProtectedPage: React.FC = () => {
  debugRendering('ProtectedPage');
  redirect(routes.mail.list);
};

export default ProtectedPage;
