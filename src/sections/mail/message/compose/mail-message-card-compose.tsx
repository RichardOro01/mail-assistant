import { useState, useRef, useEffect } from 'react';
import { Textarea } from '../../../../components/ui/textarea';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';

const MailMessageCardCompose = () => {
  const [text, setText] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const sendMail = async () => {
    try {
      const response = await fetch('/api/smtp-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ to, subject, text })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent:', result.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className='flex flex-col mx-5 my-3 gap-3'>
      <div className='flex items-center gap-4 mb-4'>
        <Label htmlFor='to' className='text-lg font-semibold'>
          To
        </Label>
        <Input
          id='to'
          type='text'
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className='flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400'
        />
      </div>
      <Input
        type='text'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder='Subject'
        className='w-full px-0 mb-4 text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0'
      />
      <Textarea
        ref={textareaRef}
        value={text}
        placeholder='Say hello'
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className='w-full px-0 text-lg font-medium resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0'
        style={{ overflow: 'hidden' }}
      />
      <div className='flex gap-4'>
        <button className='font-semibold' onClick={sendMail}>
          Send
        </button>
        <button>Send later</button>
      </div>
    </div>
  );
};

export default MailMessageCardCompose;
