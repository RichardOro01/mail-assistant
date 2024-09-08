import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import FormTextarea from '@/components/form-hook/form-textarea';
import MailMessageReplyButtons from './mail-message-reply-buttons';

const MailMessageReplyForm: React.FC = () => {
  debugRendering('MailMessageReplyForm');
  return (
    <div className='flex flex-col gap-2'>
      <FormTextarea
        name='text'
        autoSize
        className='w-full text-lg font-medium resize-none bg-transparent overflow-hidden'
        rows={5}
      />
      <MailMessageReplyButtons />
    </div>
  );
};

export default MailMessageReplyForm;
