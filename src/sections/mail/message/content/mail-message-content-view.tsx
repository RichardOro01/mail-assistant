import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { getConversationById } from '@/services/email';
import GeneralError from '@/components/error/general-error';
import { routes } from '@/lib/routes';
import { redirect } from 'next/navigation';
import MailMessageContentHeader from './mail-message-content-header';
import dynamic from 'next/dynamic';

const MailMessageContentCard = dynamic(() => import('./mail-message-content-card'), { ssr: false });

interface MailMessageContentViewProps {
  conversationId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ conversationId }) => {
  try {
    debugRendering('MailMessageContentView');
    const conversation = await getConversationById(conversationId);
    if (!conversation) redirect(routes.mail.list);
    return (
      <div className='flex flex-col my-4 px-8'>
        <MailMessageContentHeader subject={conversation.subject} />
        <MailMessageContentCard conversation={conversation} />
      </div>
    );
  } catch {
    return <GeneralError />;
  }
};

export default MailMessageContentView;
