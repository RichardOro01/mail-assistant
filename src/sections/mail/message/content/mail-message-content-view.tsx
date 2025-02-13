import React, { Suspense } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailMessageContentContainer from './mail-message-content-container';
import MailMessageContentSkeleton from './mail-message-content-skeleton';

interface MailMessageContentViewProps {
  messageId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ messageId }) => {
  debugRendering('MailMessageContentView');
  return (
    <div className='flex flex-col my-4 px-8 w-full'>
      <Suspense fallback={<MailMessageContentSkeleton />}>
        <MailMessageContentContainer messageId={messageId} />
      </Suspense>
    </div>
  );
};

export default MailMessageContentView;
