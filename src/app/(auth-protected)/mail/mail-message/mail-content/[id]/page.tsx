import MailCard from '@/components/card/mail-card';
import { getConversationById } from '@/server/services/email';

interface MailContentProps {
  params: {
    id: string;
  };
}

const MailContent: React.FC<MailContentProps> = async ({ params }) => {
  const conversation = await getConversationById(params.id);

  return <MailCard conversation={conversation} />;
};

export default MailContent;
