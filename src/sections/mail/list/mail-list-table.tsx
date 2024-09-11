'use client';

import { Table, TableBody } from '../../../components/ui/table';
import { useEffect } from 'react';
import { useMailContext } from '@/sections/mail/provider/hooks';
import MailListRow from './mail-list-row';
import { IMessage } from '@/types/imap';

interface MailListTable {
  messages: IMessage[];
}

const MailListTable: React.FC<MailListTable> = ({ messages }) => {
  const { setMails } = useMailContext();

  useEffect(() => {
    setMails(messages);
  }, [messages, setMails]);

  return (
    <Table>
      <TableBody>
        {messages.map((message, index) => (
          <MailListRow key={index} {...{ message }} />
        ))}
      </TableBody>
    </Table>
  );
};

export default MailListTable;
