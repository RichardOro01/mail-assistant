'use client';

import React, { useState } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { useMailContext } from '../provider/hooks';
import { useTranslationClient } from '@/i18n/client';
import { routes } from '@/lib/routes';
import { IMessage } from '@/types/imap';
import { emailService } from '@/services/email';
import { useHandleError } from '@/lib/error/hooks';
import { toast } from '@/hooks/use-toast';
import MailListRowDesktop from './mail-list-row-desktop';
import MailListRowMobile from './mail-list-row-mobile';
import { useHolyRouter } from '@/components/top-loader/hook';
import { useSearchParams } from 'next/navigation';
import { SearchFilter } from '@/types/filters';

interface MailListRowProps {
  message: IMessage;
  priorityComponent: React.ReactNode;
}

const MailListRow: React.FC<MailListRowProps> = ({ message, priorityComponent }) => {
  debugRendering('MailListRow');

  const router = useHolyRouter();
  const { t } = useTranslationClient('mail-list');
  const { handleStandardError } = useHandleError();
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedMail, setSelectedMail } = useMailContext();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(SearchFilter);

  const isSelected = selectedMail?.uid === message.uid;

  const handleViewMessage = () => {
    router.push(`${routes.mail.message.content}/${message.uid}`);
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

  const handleSelect = () => {
    setSelectedMail(message);
  };

  return (
    <>
      <MailListRowDesktop
        {...{ isDeleting, isSelected, message, priorityComponent }}
        onDelete={handleDelete}
        onSelect={handleSelect}
        onViewMessage={handleViewMessage}
        className='hidden md:table-row'
        search={searchValue}
      />
      <MailListRowMobile
        {...{ isDeleting, message, priorityComponent }}
        onDelete={handleDelete}
        onViewMessage={handleViewMessage}
        className='md:hidden'
        search={searchValue}
      />
    </>
  );
};

export default MailListRow;
