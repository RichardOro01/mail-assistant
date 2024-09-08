import React, { Suspense } from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import MailListHeader from './mail-list-header';
import MailListTableContainer from './mail-list-table-container';

const MailListView: React.FC = async () => {
  debugRendering('MailListView');
  return (
    <Tabs defaultValue='0' className='w-full'>
      <MailListHeader />
      <TabsContent key={'0'} value={'0'}>
        <Suspense fallback='loading'>
          <MailListTableContainer />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default MailListView;
