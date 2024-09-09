'use client';

import { IConversation } from '@/types/email';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';
import { Separator } from '../../../../components/ui/separator';
import { Reply } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import MailMessageReplyContainer from './reply/mail-message-reply-container';
import { useMailContext } from '../../provider/hooks';

type MailMessageContentCardProps = {
  conversation: IConversation;
};

const MailMessageContentCard: React.FC<MailMessageContentCardProps> = ({ conversation }) => {
  const [showReply, setShowReply] = useState(false);
  const { setSelectedMail } = useMailContext();

  useEffect(() => {
    setSelectedMail(conversation);
  }, [conversation, setSelectedMail]);

  const htmlContent = useMemo(
    () => (
      <div className='flex flex-col gap-5'>
        {conversation?.emails.map((email, index) => (
          <div key={email.id}>
            <div className='flex justify-between'>
              <h2 className='font-semibold text-lg'>{email.from.name}</h2>
              <p className='opacity-50 text-lg'>{email.date ? format(email.date, 'hh:mm a') : ''}</p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: `${DOMPurify.sanitize(conversation ? (email.html ? email.html : email.text) : '')}`
              }}
              className='mt-2 text-sm'></div>
            {index !== conversation?.emails.length - 1 && <Separator className='mt-6' />}
          </div>
        ))}
      </div>
    ),
    [conversation]
  );

  return (
    <div className='flex flex-col my-4 justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px] overflow-auto'>
      <div className='flex flex-col mx-5 my-3'>{htmlContent}</div>
      <div className='sticky bottom-0 bg-white border-t border-slate-300 mt-4 py-2 px-4 items-center justify-end '>
        <button title='Reply' onClick={() => setShowReply(true)}>
          <Reply />
        </button>
        {showReply && <MailMessageReplyContainer />}
      </div>
    </div>
  );
};

export default MailMessageContentCard;
