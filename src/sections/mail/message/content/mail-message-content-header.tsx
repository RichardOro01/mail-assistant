import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { ChevronLeft, Speech, Trash } from 'lucide-react';
import LoadingCircle from '@/components/ui/loading-circle';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';
import { routes } from '@/lib/routes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MailOpenMenuButton from '../../mail-open-menu-button';

interface MailMessageContentHeaderProps {
  subject: string;
  isSpeechLoading: boolean;
  isSpeaking: boolean;
  onSpeech: () => void;
}

const MailMessageContentHeader: React.FC<MailMessageContentHeaderProps> = ({
  subject,
  onSpeech,
  isSpeaking,
  isSpeechLoading
}) => {
  debugRendering('MailMessageContentHeader');
  const { t } = useTranslationClient('message-reply');

  return (
    <div className='flex flex-col md:flex-row justify-between gap-8'>
      <div className='flex flex-col md:flex-row gap-4 items-center'>
        <div className='flex justify-between w-full md:w-fit'>
          <Link href={routes.mail.list}>
            <Button className='rounded-full shadow-md' variant='link' size='icon'>
              <ChevronLeft color='gray' />
            </Button>
          </Link>
          <MailOpenMenuButton className='md:hidden flex' />
        </div>
        <h2 className='text-xl md:text-2xl font-semibold'>{subject}</h2>
      </div>
      <div className='flex ml-2 gap-4 items-center justify-end'>
        <button type='button' title={t('read')} onClick={onSpeech} disabled={isSpeechLoading}>
          {!isSpeechLoading ? (
            <Speech color='gray' size={18} className={clsx({ 'animate-pulse': isSpeaking })} />
          ) : (
            <LoadingCircle />
          )}
        </button>
        <Trash color='gray' size={18} />
        <MailOpenMenuButton className='hidden md:flex' />
      </div>
    </div>
  );
};

export default MailMessageContentHeader;
