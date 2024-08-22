import MailCard from "@/components/card/mail-card";
import LeftBar from "@/components/sheet/left-bar";
import { getConversationById } from "@/server/services/email";

const MailContent: React.FC<any> = async ({ params }) => {
  const conversation = await getConversationById(params.id);

  return (
    <div className="flex w-full">
      <LeftBar />
      <MailCard conversation={conversation} />
    </div>
  );
};

export default MailContent;
