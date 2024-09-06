import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { getConversationById } from '@/services/email';
import MailMessageCard from '../mail-message-card';

interface MailMessageContentViewProps {
  conversationId: string;
}

const MailMessageContentView: React.FC<MailMessageContentViewProps> = async ({ conversationId }) => {
  debugRendering('MailMessageContentView');
  const conversation = await getConversationById(conversationId);

  return <MailMessageCard conversation={conversation} />;
};

export default MailMessageContentView;
