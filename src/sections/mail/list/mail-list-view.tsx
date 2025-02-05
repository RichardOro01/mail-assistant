import React, { Suspense } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListHeader from './mail-list-header';
import MailListTableContainer from './mail-list-table-container';
import MailListSkeleton from './mail-list-skeleton';
import { EmailFilters } from '@/types/filters';

const MESSAGES_COUNT = 20;

interface MailListViewProps {
  filters: EmailFilters;
}

const MailListView: React.FC<MailListViewProps> = ({ filters }) => {
  debugRendering('MailListView');
  return (
    <div className='w-full'>
      <MailListHeader {...{ filters }} />
      <Suspense fallback={<MailListSkeleton rows={MESSAGES_COUNT} />}>
        <MailListTableContainer messagesCount={MESSAGES_COUNT} {...{ filters }} />
      </Suspense>
    </div>
  );
};

export default MailListView;
