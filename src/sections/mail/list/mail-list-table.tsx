'use client';

import { IConversation } from '@/types/email';
import { Table, TableBody, TableCell, TableRow } from '../../../components/ui/table';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { useMailContext } from '@/sections/mail/provider/hooks';

interface MailListTable {
  conversations: IConversation[];
}

const MailListTable: React.FC<MailListTable> = ({ conversations }) => {
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const { selectedMail, setMails } = useMailContext();
  const route = useRouter();

  useEffect(() => {
    setMails(conversations);
  }, [conversations, setMails]);

  return (
    <Table>
      <TableBody>
        {conversations.map((conversation, index) => (
          <TableRow
            key={index}
            className={`border-none px-6 ${conversation.read ? 'font-normal' : 'font-semibold'} ${
              selectedMail?.id === conversation.id ? 'bg-gray-100 hover:bg-gray-100' : ''
            }`}
            onMouseEnter={() => setShowOptions(index)}
            onMouseLeave={() => setShowOptions(null)}>
            <TableCell
              className={`w-[150px] py-3 ${selectedMail?.id === conversation.id ? 'border-l-4 border-blue-400' : ''}`}
              onClick={() => route.push(`${routes.mail.message.content}/${conversation.emails[0].id}`)}>
              <span className='line-clamp-1'>
                {conversation.emails[0].from.name
                  ? conversation.emails[0].from.name
                  : conversation.emails[0].from.email}
              </span>
            </TableCell>
            <TableCell
              className='py-3'
              onClick={() => route.push(`${routes.mail.message.content}/${conversation.emails[0].id}`)}>
              <span className='line-clamp-1'>
                {conversation.subject}
                <span className='ml-5'>{conversation.emails[0].text}</span>
              </span>
            </TableCell>
            <TableCell className='min-w-[100px] text-right py-0'>
              {showOptions === index ? (
                <div className='flex gap-2 justify-end'>
                  <button title='check'>
                    <Check size={18} color='gray' />
                  </button>
                  <button title='delete' onClick={() => console.log('eliminar')}>
                    <Trash2 size={18} color='gray' />
                  </button>
                </div>
              ) : conversation.emails[0].date ? (
                format(conversation.emails[0].date, 'hh:mm a')
              ) : (
                ''
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MailListTable;
