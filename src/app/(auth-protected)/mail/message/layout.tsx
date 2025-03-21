import { LayoutBaseProps } from '@/types/utils';

const LeftBarLayout: React.FC<LayoutBaseProps> = async ({ children }) => {
  return (
    <div className='flex w-full'>
      <div className='flex overflow-y-auto w-full'>{children}</div>
    </div>
  );
};

export default LeftBarLayout;
