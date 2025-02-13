'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import HelperText from './helper-text';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean;
  error?: boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoSize, value, error, helperText, ...props }, ref) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    React.useImperativeHandle(ref, () => textAreaRef?.current as unknown as HTMLTextAreaElement);

    React.useEffect(() => {
      if (textAreaRef.current) {
        if (autoSize) {
          textAreaRef.current.style.height = 'auto';
          textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        } else {
          textAreaRef.current.style.height = 'auto';
        }
      }
    }, [value, autoSize]);

    return (
      <div className='w-full flex flex-col gap-1'>
        <textarea
          className={cn(
            'flex min-h-[156px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={textAreaRef}
          {...{ value }}
          {...props}
        />
        {helperText && <HelperText text={helperText} {...{ error }} />}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
