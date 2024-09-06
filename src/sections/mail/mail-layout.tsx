import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { LayoutBaseProps } from '@/types/utils';
import MailMenu from './mail-menu';

const MailLayout: React.FC<LayoutBaseProps> = ({ children }) => {
  debugRendering('MailLayout');
  return (
    <div className='flex justify-between'>
      <main className='flex max-h-screen overflow-y-auto'>{children}</main>
      <MailMenu />
    </div>
  );
};

export default MailLayout;
