import { Table, TableBody } from '../../../components/ui/table';
import MailListRow from './mail-list-row';
import { IMessageWithPriority } from '@/types/imap';
import MailListEmpty from './mail-list-empty';
import MailListRowPriorityContainer from './mail-list-row-priority-container';
import { Suspense } from 'react';
import MailListRowPriority from './mail-list-row-priority';
import MailListTableSelection from './mail-list-table-selection';

interface MailListTable {
  messagesWithPriorities: IMessageWithPriority[];
}

const MailListTable: React.FC<MailListTable> = ({ messagesWithPriorities }) => {
  if (!messagesWithPriorities.length) return <MailListEmpty />;

  return (
    <div className='relative overflow-hidden'>
      <MailListTableSelection />
      <Table className='table-fixed'>
        <TableBody>
          {messagesWithPriorities.map((message, index) => (
            <MailListRow
              key={index}
              {...{ message }}
              priorityComponent={
                <Suspense fallback={<MailListRowPriority priority='loading' />}>
                  <MailListRowPriorityContainer message={message.text} uid={message.uid} priority={message.priority} />
                </Suspense>
              }
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MailListTable;
