import React, { RefObject, useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Reply } from 'lucide-react';
import MailMessageReplyContainer from './mail-message-reply-container';
import { IMessage } from '@/types/imap';

interface MailMessageReplyProps {
  message: IMessage;
  divRef: RefObject<HTMLDivElement>;
}

const MailMessageReply: React.FC<MailMessageReplyProps> = ({ message, divRef }) => {
  debugRendering('MailMessageReply');

  const [showReply, setShowReply] = useState(false);

  return (
    <div className='bg-white border-t border-slate-300 mt-4 py-2 px-4 items-center justify-end '>
      <button title='Reply' onClick={() => setShowReply((current) => !current)}>
        <Reply />
      </button>
      <MailMessageReplyContainer hidden={!showReply} {...{ message, divRef }} />
    </div>
  );
};

export default MailMessageReply;
