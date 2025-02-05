import { Table, TableBody } from '../../../components/ui/table';
import MailListRow from './mail-list-row';
import { IMessage } from '@/types/imap';
import MailListEmpty from './mail-list-empty';
import MailListRowPriorityContainer from './mail-list-row-priority-container';
import { Suspense } from 'react';

interface MailListTable {
  messages: IMessage[];
}

const MailListTable: React.FC<MailListTable> = ({ messages }) => {
  if (!messages.length) return <MailListEmpty />;

  return (
    <Table>
      <TableBody>
        {messages.map((message, index) => (
          <MailListRow
            key={index}
            {...{ message }}
            priorityComponent={
              <Suspense fallback={'loading'}>
                <MailListRowPriorityContainer message={message.text} />
              </Suspense>
            }
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default MailListTable;
