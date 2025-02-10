'use client';

import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { TableCell, TableRow } from '@/components/ui/table';
import { Eye, LoaderCircle, Trash2 } from 'lucide-react';
import { format, isSameDay } from 'date-fns';
import { useMailContext } from '../provider/hooks';
import { useTranslationClient } from '@/i18n/client';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { IMessage } from '@/types/imap';
import { emailService } from '@/services/email';
import { useHandleError } from '@/lib/error/hooks';
import { toast } from '@/hooks/use-toast';

interface MailListRowProps {
  message: IMessage;
  priorityComponent: React.ReactNode;
}

const MailListRow: React.FC<MailListRowProps> = ({ message, priorityComponent }) => {
  debugRendering('MailListRow');

  const [showOptions, setShowOptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedMail, setSelectedMail } = useMailContext();
  const { t } = useTranslationClient('mail-list');
  const route = useRouter();
  const { handleStandardError } = useHandleError();
  const router = useRouter();

  const viewMessage = (id: number) => {
    route.push(`${routes.mail.message.content}/${id}`);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await emailService.deleteEmail(message.uid);
      router.refresh();
      toast({ title: t('message_deleted'), variant: 'success' });
    } catch (error) {
      handleStandardError(error);
    }
    setIsDeleting(false);
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
          <span className='ml-5 opacity-60'>{message.text}</span>
        </span>
      </TableCell>
      <TableCell className='w-[120px] text-right py-0'>
        {showOptions || isDeleting ? (
          <div className='flex gap-2 justify-end'>
            {!isDeleting ? (
              <>
                <button title={t('view')}>
                  <Eye size={18} color='gray' onClick={() => viewMessage(message.uid)} />
                </button>
                <button title={t('delete')} onClick={handleDelete}>
                  <Trash2 size={18} color='gray' />
                </button>
              </>
            ) : (
              <LoaderCircle size={18} color='gray' className='animate-spin animate-duration-[2000ms]' />
            )}
          </div>
        ) : message.date ? (
          format(message.date, isSameDay(message.date, new Date()) ? 'hh:mm a' : 'yyyy/MM/dd')
        ) : (
          ''
        )}
      </TableCell>
      <TableCell className='py-0 w-32'>{priorityComponent}</TableCell>
    </TableRow>
  );
};

export default MailListRow;
