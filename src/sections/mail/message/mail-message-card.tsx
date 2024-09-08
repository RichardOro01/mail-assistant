'use client';
import { IConversation } from '@/types/email';
import { useEffect } from 'react';
import { useMailContext } from '@/sections/mail/provider/hooks';
import MailMessageCardHeader from './mail-message-card-header';
import MailMessageCardContent from './content/mail-message-card-content';
import MailMessageComposeFormContainer from './compose/mail-message-compose-form-container';

type MailCardProps = {
  conversation?: IConversation;
};

const MailMessageCard: React.FC<MailCardProps> = ({ conversation }) => {
  const { setSelectedMail } = useMailContext();

  useEffect(() => {
    setSelectedMail(conversation);
  }, [setSelectedMail, conversation]);

  return (
    <div className='flex flex-col w-screen gap-8 mx-20 my-10'>
      <MailMessageCardHeader title={conversation ? conversation.subject : null} />
      <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px]'>
        {conversation ? <MailMessageCardContent conversation={conversation} /> : <MailMessageComposeFormContainer />}
      </div>
    </div>
  );
};

export default MailMessageCard;
