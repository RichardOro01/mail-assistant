import { debugRendering } from '@/lib/debug';
import MailListView from '@/sections/mail/list/mail-list-view';

const MailList = async () => {
  debugRendering('MailList');
  return <MailListView />;
};

export default MailList;
