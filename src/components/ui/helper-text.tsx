import React from 'react';
import clsx from 'clsx';

interface HelperTextProps {
  text: string | number;
  error?: boolean;
}

const HelperText: React.FC<HelperTextProps> = ({ text, error }) => {
  return (
    <p
      className={clsx('animate-flip-down animate-once animate-duration-200 animate-ease-in', {
        'text-red-500': error
      })}>
      {text}
    </p>
  );
};

export default HelperText;
