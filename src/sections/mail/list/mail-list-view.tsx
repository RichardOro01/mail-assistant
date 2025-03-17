import React, { Suspense } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import MailListHeader from './mail-list-header';
import MailListTableContainer from './mail-list-table-container';
import MailListSkeleton from './mail-list-skeleton';
import { EmailFilters } from '@/types/filters';
import MailListFloatCompose from './mail-list-float-compose';
import { MESSAGES_COUNT } from '../config';

interface MailListViewProps {
  filters: EmailFilters;
}

const MailListView: React.FC<MailListViewProps> = ({ filters }) => {
  debugRendering('MailListView');
  return (
    <div className='w-full flex flex-col'>
      <MailListHeader {...{ filters }} />
      <Suspense fallback={<MailListSkeleton rows={MESSAGES_COUNT} />}>
        <MailListTableContainer messagesCount={MESSAGES_COUNT} {...{ filters }} />
      </Suspense>
      <MailListFloatCompose />
    </div>
  );
};

export default MailListView;
