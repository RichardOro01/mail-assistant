import React, { useMemo } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { IMessage } from '@/types/imap';
import DOMPurify from 'dompurify';
import { format } from 'date-fns';

type MailMessageContentHTMLProps = {
  message: IMessage;
};

const MailMessageContentHtml: React.FC<MailMessageContentHTMLProps> = ({ message }) => {
  debugRendering('MailMessageContentHtml');

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
  return <div className='flex flex-col mx-5 my-3'>{htmlContent}</div>;
};

export default MailMessageContentHtml;
