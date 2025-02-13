import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';
import MailMessageContentClientContainer from './mail-message-content-client-container';
import { emailService } from '@/services/email';

interface MailMessageContentContainerProps {
  messageId: string;
}

const MailMessageContentContainer: React.FC<MailMessageContentContainerProps> = async ({ messageId }) => {
  debugRendering('MailMessageContentContainer');

  try {
    const { data } = await emailService.getMailByUid(Number(messageId));

    return <MailMessageContentClientContainer message={data} />;
  } catch (error) {
    console.log(error);
    return <GeneralError />;
  }
};

export default MailMessageContentContainer;
