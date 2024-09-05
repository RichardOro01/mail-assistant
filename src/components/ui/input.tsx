import clsx from 'clsx';
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';
import HelperText from './helper-text';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: boolean;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, startAdornment, endAdornment, error, helperText, ...props }, ref) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        <label
          className={clsx(
            cn(
              'flex w-full transition-all cursor-text gap-2 rounded-md  px-3 py-2 focus-within:ring-1  bg-transparent ',
              className
            ),
            {
              'cursor-not-allowed opacity-50': disabled,
              'border-2 focus-within:ring-error-600 dark:focus-within:ring-error-300 border-error-700 dark:border-error-200':
                error,
              'border focus-within:ring-grey-600 dark:focus-within:ring-grey-300 border-grey-200': !error
            }
          )}>
          {startAdornment}
          <input
            type={type}
            className='w-full text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium bg-transparent placeholder:text-grey-500 dark:placeholder:text-grey-400 focus-visible:outline-none disabled:cursor-not-allowed'
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {endAdornment}
        </label>
        {helperText && <HelperText text={helperText} {...{ error }} />}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
