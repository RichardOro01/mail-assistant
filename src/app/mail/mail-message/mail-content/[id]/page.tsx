import MailCard from "@/components/card/mail-card";
import { getConversationById } from "@/server/services/email";

const MailContent: React.FC<any> = async ({ params }) => {
  const conversation = await getConversationById(params.id);

  return <MailCard conversation={conversation} />;
};

export default MailContent;
