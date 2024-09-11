'use client';

import { IConversation } from '@/types/email';
import { Table, TableBody } from '../../../components/ui/table';
import { useEffect } from 'react';
import { useMailContext } from '@/sections/mail/provider/hooks';
import MailListRow from './mail-list-row';

interface MailListTable {
  conversations: IConversation[];
}

const MailListTable: React.FC<MailListTable> = ({ conversations }) => {
  const { setMails } = useMailContext();

  useEffect(() => {
    setMails(conversations);
  }, [conversations, setMails]);

  return (
    <Table>
      <TableBody>
        {conversations.map((conversation, index) => (
          <MailListRow key={index} {...{ conversation }} />
        ))}
      </TableBody>
    </Table>
  );
};

export default MailListTable;
