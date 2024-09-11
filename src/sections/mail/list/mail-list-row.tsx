import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { TableCell, TableRow } from '@/components/ui/table';
import { Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useMailContext } from '../provider/hooks';
import { IConversation } from '@/types/email';
import { useTranslationClient } from '@/i18n/client';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';

interface MailListRowProps {
  conversation: IConversation;
}

const MailListRow: React.FC<MailListRowProps> = ({ conversation }) => {
  debugRendering('MailListRow');

  const [showOptions, setShowOptions] = useState(false);
  const { selectedMail, setSelectedMail } = useMailContext();
  const { t } = useTranslationClient('mail-list');
  const route = useRouter();

  const viewMessage = (id: string) => {
    route.push(`${routes.mail.message.content}/${id}`);
  };

  return (
    <TableRow
      className={`border-none px-6 ${conversation.read ? 'font-normal' : 'font-semibold'} ${
        selectedMail?.id === conversation.id ? 'bg-gray-100 hover:bg-gray-100' : ''
      }`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => setSelectedMail(conversation)}
      onDoubleClick={() => viewMessage(conversation.id)}>
      <TableCell
        className={`w-[150px] py-3 ${selectedMail?.id === conversation.id ? 'border-l-4 border-blue-400' : ''}`}>
        <span className='line-clamp-1'>
          {conversation.emails[0].from.name ? conversation.emails[0].from.name : conversation.emails[0].from.email}
        </span>
      </TableCell>
      <TableCell className='py-3'>
        <span className='line-clamp-1'>
          {conversation.subject}
          <span className='ml-5'>{conversation.emails[0].text}</span>
        </span>
      </TableCell>
      <TableCell className='min-w-[100px] text-right py-0'>
        {showOptions ? (
          <div className='flex gap-2 justify-end'>
            <button title={t('view')}>
              <Eye size={18} color='gray' onClick={() => viewMessage(conversation.id)} />
            </button>
            <button title={t('delete')} onClick={() => console.log('eliminar')}>
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
  );
};

export default MailListRow;
