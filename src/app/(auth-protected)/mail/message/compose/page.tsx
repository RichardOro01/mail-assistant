import { debugRendering } from '@/lib/debug';
import MailMessageComposeView from '@/sections/mail/message/compose/mail-message-compose-view';

export const metadata = {
  title: 'Mail Assistant - Compose'
};

const MailComposePage = () => {
  debugRendering('MailComposePage');
  return <MailMessageComposeView />;
};

export default MailComposePage;
