import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { twMerge } from 'tailwind-merge';

const FloatButton: React.FC<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ className, ...props }) => {
  debugRendering('FloatButton');
  return (
    <button
      className={twMerge(
        'flex items-center justify-center absolute bottom-16 right-10 border rounded-full shadow-md size-16 bg-slate-50 bg-opacity-10 backdrop-blur-md active:scale-110 transition-all',
        className
      )}
      {...props}
    />
  );
};

export default FloatButton;
