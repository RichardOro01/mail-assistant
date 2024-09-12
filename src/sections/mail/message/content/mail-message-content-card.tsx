'use client';

import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { Reply } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import MailMessageReplyContainer from './reply/mail-message-reply-container';
import { useMailContext } from '../../provider/hooks';
import { IMessage } from '@/types/imap';

type MailMessageContentCardProps = {
  message: IMessage;
};

const MailMessageContentCard: React.FC<MailMessageContentCardProps> = ({ message }) => {
  const [showReply, setShowReply] = useState(false);
  const { setSelectedMail } = useMailContext();

  useEffect(() => {
    setSelectedMail(message);
  }, [message, setSelectedMail]);

  const htmlContent = useMemo(
    () => (
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h2 className='font-semibold text-lg'>{message.from.name || message.from.address}</h2>
          <p className='opacity-50 text-lg'>{message.date ? format(message.date, 'hh:mm a') : ''}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: `${DOMPurify.sanitize(message.html || message.text || '')}`
          }}
          className='mt-2 text-base'></div>
      </div>
    ),
    [message]
  );

  return (
    <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px] overflow-auto'>
      <div className='flex flex-col mx-5 my-3'>{htmlContent}</div>
      <div className='bg-white border-t border-slate-300 mt-4 py-2 px-4 items-center justify-end '>
        <button title='Reply' onClick={() => setShowReply(true)}>
          <Reply />
        </button>
        {showReply && <MailMessageReplyContainer />}
      </div>
    </div>
  );
};

export default MailMessageContentCard;
