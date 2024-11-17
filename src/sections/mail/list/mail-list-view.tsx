import React, { Suspense } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Tabs, TabsContent } from '@/components/ui/tabs';
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
    <Tabs defaultValue='0' className='w-full'>
      <MailListHeader {...{ filters }} />
      <TabsContent key={'0'} value={'0'}>
        <Suspense fallback={<MailListSkeleton rows={MESSAGES_COUNT} />}>
          <MailListTableContainer messagesCount={MESSAGES_COUNT} {...{ filters }} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default MailListView;
