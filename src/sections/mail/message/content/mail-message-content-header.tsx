import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Speech, Trash } from 'lucide-react';
import LoadingCircle from '@/components/ui/loading-circle';
import clsx from 'clsx';
import { useTranslationClient } from '@/i18n/client';

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
    <div className='flex justify-between'>
      <h2 className='text-2xl font-semibold'>{subject}</h2>
      <div className='flex ml-2 gap-4 items-center'>
        <button type='button' title={t('read')} onClick={onSpeech} disabled={isSpeechLoading}>
          {!isSpeechLoading ? (
            <Speech color='gray' size={18} className={clsx({ 'animate-pulse': isSpeaking })} />
          ) : (
            <LoadingCircle />
          )}
        </button>
        <Trash color='gray' size={18} />
      </div>
    </div>
  );
};

export default MailMessageContentHeader;
