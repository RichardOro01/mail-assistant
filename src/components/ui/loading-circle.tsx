import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { LoaderCircle } from 'lucide-react';

interface LoadingCircleProps {
  size?: number;
  color?: string;
}

const LoadingCircle: React.FC<LoadingCircleProps> = ({ size = 16, color = 'grey' }) => {
  debugRendering('LoadingCircle');
  return <LoaderCircle width={size} height={size} color={color} className='animate-spin animate-duration-[2000ms]' />;
};

export default LoadingCircle;
