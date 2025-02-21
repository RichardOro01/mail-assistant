import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { TableCell, TableRow } from '@/components/ui/table';
import { format, isSameDay } from 'date-fns';
import { IMessage } from '@/types/imap';
import { Eye, LoaderCircle, Trash2 } from 'lucide-react';
import { useTranslationClient } from '@/i18n/client';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertDialogDefault } from '@/components/ui/alert-dialog';
import Highlighter from 'react-highlight-words';

interface MailListRowDesktopProps {
  message: IMessage;
  className?: string;
  isSelected: boolean;
  isDeleting: boolean;
  priorityComponent: React.ReactNode;
  search: string | null;
  onDelete: () => void;
  onSelect: () => void;
  onViewMessage: () => void;
}

const MailListRowDesktop: React.FC<MailListRowDesktopProps> = ({
  search,
  message,
  className,
  isSelected,
  isDeleting,
  priorityComponent,
  onSelect,
  onDelete,
  onViewMessage
}) => {
  debugRendering('MailListRowDesktop');

  const { t } = useTranslationClient('mail-list');
  const [showOptions, setShowOptions] = useState(false);

  return (
    <TableRow
      className={twMerge(
        clsx('border-none px-6', {
          'font-normal': message.read,
          'font-semibold': !message.read,
          'bg-gray-100 hover:bg-gray-100': isSelected
        }),
        className
      )}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      onClick={() => onSelect()}
      onDoubleClick={() => onViewMessage()}>
      <TableCell className={`w-[150px] py-3 ${isSelected ? 'border-l-4 border-blue-400' : ''}`}>
        <span className='line-clamp-1'>
          <Highlighter
            textToHighlight={message?.from?.name ? message.from.name : message.from.address || ''}
            searchWords={[search || '']}
          />
        </span>
      </TableCell>
      <TableCell className='py-3'>
        <span className='line-clamp-1'>
          <Highlighter textToHighlight={message.subject || ''} searchWords={[search || '']} />
          <span className='ml-5 opacity-60'>
            <Highlighter textToHighlight={message.text || ''} searchWords={[search || '']} />
          </span>
        </span>
      </TableCell>
      <TableCell className='py-0 w-32'>{priorityComponent}</TableCell>
      <TableCell className='w-[120px] text-right py-0'>
        {showOptions || isDeleting ? (
          <div className='flex gap-2 justify-end'>
            {!isDeleting ? (
              <>
                <button title={t('view')}>
                  <Eye size={18} color='gray' onClick={() => onViewMessage()} />
                </button>
                <AlertDialogDefault
                  onOk={onDelete}
                  description={t('delete_alert')}
                  variant={'destructive'}
                  disabled={isDeleting}>
                  <Trash2 color='gray' size={18} />
                </AlertDialogDefault>
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
    </TableRow>
  );
};

export default MailListRowDesktop;
