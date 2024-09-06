import { debugRendering } from '@/lib/debug';
import MailMessageComposeView from '@/sections/mail/message/compose/mail-message-compose-view';

const MailComposePage = () => {
  debugRendering('MailComposePage');
  return <MailMessageComposeView />;
};

export default MailComposePage;
