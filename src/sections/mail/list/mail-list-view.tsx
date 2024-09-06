import React from 'react';
import { debugRendering } from '@/lib/debug/debuggers';
import { getConversations } from '@/services/email';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import MailListHeader from './mail-list-header';
import MailListTable from '@/sections/mail/list/mail-list-table';

const MailListView: React.FC = async () => {
  debugRendering('MailListView');
  const conversations = await getConversations();
  return (
    <Tabs defaultValue='0' className='w-full'>
      <MailListHeader />
      <TabsContent key={'0'} value={'0'}>
        <MailListTable conversations={conversations.reverse()} />
      </TabsContent>
    </Tabs>
  );
};

export default MailListView;
