import MailMessageContentView from '@/sections/mail/message/content/mail-message-content-view';

interface MailContentPageProps {
  params: {
    id: string;
  };
}

const MailContentPage: React.FC<MailContentPageProps> = async ({ params: { id } }) => {
  return <MailMessageContentView messageId={id} />;
};

export default MailContentPage;
