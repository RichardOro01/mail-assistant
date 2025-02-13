'use client';

import { useEffect, useRef } from 'react';
import { useMailContext } from '../../provider/hooks';
import { IMessage } from '@/types/imap';
import MailMessageReply from './reply/mail-message-reply';
import dynamic from 'next/dynamic';
const MailMessageContentHtml = dynamic(() => import('./mail-message-content-html'), { ssr: false });

type MailMessageContentCardProps = {
  message: IMessage;
};

const MailMessageContentCard: React.FC<MailMessageContentCardProps> = ({ message }) => {
  const { setSelectedMail } = useMailContext();

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedMail(message);
  }, [message, setSelectedMail]);

  return (
    <div
      ref={divRef}
      className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px] overflow-auto'>
      <MailMessageContentHtml {...{ message }} />
      <MailMessageReply {...{ message, divRef }} />
    </div>
  );
};

export default MailMessageContentCard;
