import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import dynamic from 'next/dynamic';
import { emailServiceBackend } from '@/services/email/email';
import MailMessageContentHeader from './mail-message-content-header';

const MailMessageContentCard = dynamic(() => import('./mail-message-content-card'), { ssr: false });

interface MailMessageContentViewProps {
  messageId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ messageId }) => {
  try {
    debugRendering('MailMessageContentView');
    const message = await emailServiceBackend.getEmailByUid(Number(messageId));
    return (
      <div className='flex flex-col my-4 px-8 w-full'>
        <MailMessageContentHeader subject={message.subject ?? ''} />
        <MailMessageContentCard message={message} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <GeneralError />;
  }
};

export default MailMessageContentView;
