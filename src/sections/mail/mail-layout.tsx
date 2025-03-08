import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { LayoutBaseProps } from '@/types/utils';
import MailMenu from './mail-menu';

const MailLayout: React.FC<LayoutBaseProps> = ({ children }) => {
  debugRendering('MailLayout');
  return (
    <div className='flex justify-between w-full h-screen-support'>
      <main className='flex max-h-screen overflow-y-auto w-full'>{children}</main>
      <div
        className='h-full bg-slate-50 border-slate-100 border p-8 lg:w-[400px] w-[300px] hidden 2xl:flex'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 14px 17px inset'
        }}>
        <MailMenu />
      </div>
    </div>
  );
};

export default MailLayout;
