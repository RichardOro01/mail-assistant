import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { TableCell, TableRow } from '@/components/ui/table';
import { Eye, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useMailContext } from '../provider/hooks';
import { useTranslationClient } from '@/i18n/client';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { IMessage } from '@/types/imap';

interface MailListRowProps {
  message: IMessage;
}

const MailListRow: React.FC<MailListRowProps> = ({ message }) => {
  debugRendering('MailListRow');

  const [showOptions, setShowOptions] = useState(false);
  const { selectedMail, setSelectedMail } = useMailContext();
  const { t } = useTranslationClient('mail-list');
  const route = useRouter();

  const viewMessage = (id: number) => {
    route.push(`${routes.mail.message.content}/${id}`);
  };

  return (
    <TableRow
      className={`border-none px-6 ${message.read ? 'font-normal' : 'font-semibold'} ${
        selectedMail?.uid === message.uid ? 'bg-gray-100 hover:bg-gray-100' : ''
      }`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => setSelectedMail(message)}
      onDoubleClick={() => viewMessage(message.uid)}>
      <TableCell className={`w-[150px] py-3 ${selectedMail?.uid === message.uid ? 'border-l-4 border-blue-400' : ''}`}>
        <span className='line-clamp-1'>{message?.from?.name ? message.from.name : message.from.address}</span>
      </TableCell>
      <TableCell className='py-3'>
        <span className='line-clamp-1'>
          {message.subject}
          <span className='ml-5'>{message.text}</span>
        </span>
      </TableCell>
      <TableCell className='min-w-[100px] text-right py-0'>
        {showOptions ? (
          <div className='flex gap-2 justify-end'>
            <button title={t('view')}>
              <Eye size={18} color='gray' onClick={() => viewMessage(message.uid)} />
            </button>
            <button title={t('delete')} onClick={() => console.log('eliminar')}>
              <Trash2 size={18} color='gray' />
            </button>
          </div>
        ) : message.date ? (
          format(message.date, 'hh:mm a')
        ) : (
          ''
        )}
      </TableCell>
    </TableRow>
  );
};

export default MailListRow;
