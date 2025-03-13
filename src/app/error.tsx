'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';

const Error: React.FC = () => {
  debugRendering('Error');
  return <GeneralError />;
};

export default Error;
