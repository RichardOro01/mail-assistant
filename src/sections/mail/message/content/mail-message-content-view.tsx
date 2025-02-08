import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import { emailService } from '@/services/email';
import MailMessageContentContainer from './mail-message-content-container';

interface MailMessageContentViewProps {
  messageId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ messageId }) => {
  try {
    debugRendering('MailMessageContentView');
    const { data } = await emailService.getMailByUid(Number(messageId));
    return (
      <div className='flex flex-col my-4 px-8 w-full'>
        <MailMessageContentContainer message={data} />
      </div>
    );
  } catch (e) {
    console.log(e);
    return <GeneralError />;
  }
};

export default MailMessageContentView;
