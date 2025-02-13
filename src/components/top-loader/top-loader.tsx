'use client';

import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import HolyLoader from 'holy-loader';

const TopLoader: React.FC = () => {
  debugRendering('TopLoader');
  return <HolyLoader />;
};

export default TopLoader;
