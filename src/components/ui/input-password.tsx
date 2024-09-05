'use client';

import React, { useState } from 'react';
import { Input, InputProps } from './input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

export type InputPasswordProps = Omit<InputProps, 'type' | 'endAdornment'>;

const InputPassword: React.FC<InputPasswordProps> = (props) => {
  const [hide, setHide] = useState(true);
  return (
    <Input
      type={hide ? 'password' : 'text'}
      endAdornment={
        <Button type='button' variant='ghost' className='h-auto' size='icon' onClick={() => setHide((prev) => !prev)}>
          {!hide ? <Eye /> : <EyeOff />}
        </Button>
      }
      {...props}
    />
  );
};

export default InputPassword;
