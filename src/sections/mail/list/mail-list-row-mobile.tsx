import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { IMessage } from '@/types/imap';
import { TableCell, TableRow } from '@/components/ui/table';
import { twMerge } from 'tailwind-merge';
import { format, isSameDay } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';
import { AlertDialogDefault } from '@/components/ui/alert-dialog';
import LoadingCircle from '@/components/ui/loading-circle';
import Highlighter from 'react-highlight-words';

interface MailListRowMobileProps {
  message: IMessage;
  className?: string;
  isDeleting: boolean;
  priorityComponent: React.ReactNode;
  search: string | null;
  onDelete: () => void;
  onViewMessage: () => void;
}

const MailListRowMobile: React.FC<MailListRowMobileProps> = ({
  search,
  message,
  className,
  isDeleting,
  priorityComponent,
  onDelete,
  onViewMessage
}) => {
  debugRendering('MailListRowMobile');

  const { t } = useTranslationClient('mail-list');

  return (
    <TableRow className={twMerge(className)} onClick={onViewMessage}>
      <TableCell className='flex flex-col min-h-28 gap-2'>
        <div className='flex justify-between gap-3 items-center'>
          <span className='line-clamp-1 font-semibold'>
            <Highlighter
              textToHighlight={message?.from?.name ? message.from.name : message.from.address || ''}
              searchWords={[search || '']}
            />
          </span>
          <span>
            {message.date ? format(message.date, isSameDay(message.date, new Date()) ? 'hh:mm a' : 'yyyy/MM/dd') : ''}
          </span>
        </div>
        <div className='flex justify-between gap-3 items-center'>
          <span className='line-clamp-1'>
            <Highlighter textToHighlight={message.subject || ''} searchWords={[search || '']} />
          </span>
          {priorityComponent}
        </div>
        <div className='flex justify-between gap-3 items-end'>
          <span className='opacity-60 line-clamp-2'>
            <Highlighter textToHighlight={message.text || ''} searchWords={[search || '']} />
          </span>
          <AlertDialogDefault
            onOk={onDelete}
            description={t('delete_alert')}
            variant={'destructive'}
            disabled={isDeleting}>
            {isDeleting ? <LoadingCircle color='gray' size={18} /> : <Trash2 color='gray' size={18} />}
          </AlertDialogDefault>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MailListRowMobile;
