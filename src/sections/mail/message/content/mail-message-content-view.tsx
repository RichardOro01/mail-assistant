import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import dynamic from 'next/dynamic';
import MailMessageContentHeader from './mail-message-content-header';
import { emailService } from '@/services/email';

const MailMessageContentCard = dynamic(() => import('./mail-message-content-card'), { ssr: false });

interface MailMessageContentViewProps {
  messageId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ messageId }) => {
  try {
    debugRendering('MailMessageContentView');
    const { data } = await emailService.getMailByUid(Number(messageId));
    return (
      <div className='flex flex-col my-4 px-8 w-full'>
        <MailMessageContentHeader subject={data.subject ?? ''} />
        <MailMessageContentCard message={data} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <GeneralError />;
  }
};

export default MailMessageContentView;
