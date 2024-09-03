'use client';
import { MailSelected } from '@/app/mail/layout';
import { IConversation } from '@/types/email';
import { useContext, useEffect } from 'react';
import MailCardHeader from '../layout/mail-card-header';
import MailCardContent from '../layout/mail-card-content';
import MailCardCompose from '../layout/mail-card-compose';

type MailCardProps = {
  conversation?: IConversation;
};

const MailCard: React.FC<MailCardProps> = ({ conversation }) => {
  const { setSelectedMail } = useContext(MailSelected);

  useEffect(() => {
    setSelectedMail(conversation);
  }, [setSelectedMail, conversation]);

  return (
    <div className='flex flex-col w-screen gap-8 mx-20 my-10'>
      <MailCardHeader title={conversation ? conversation.subject : null} />
      <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px]'>
        {conversation ? <MailCardContent conversation={conversation} /> : <MailCardCompose />}
      </div>
    </div>
  );
};

export default MailCard;
