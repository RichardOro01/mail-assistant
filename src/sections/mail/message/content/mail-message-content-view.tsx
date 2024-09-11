import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import GeneralError from '@/components/error/general-error';

// const MailMessageContentCard = dynamic(() => import('./mail-message-content-card'), { ssr: false });

interface MailMessageContentViewProps {
  conversationId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ conversationId }) => {
  console.log(conversationId);
  try {
    debugRendering('MailMessageContentView');
    // const conversation = await getEmailById(conversationId);
    // if (!conversation) redirect(routes.mail.list);
    return (
      <div className='flex flex-col my-4 px-8 w-full'>
        {/* <MailMessageContentHeader subject={conversation.subject} />
        <MailMessageContentCard conversation={conversation} /> */}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <GeneralError />;
  }
};

export default MailMessageContentView;
