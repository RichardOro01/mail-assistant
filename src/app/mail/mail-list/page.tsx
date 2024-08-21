import ShortcutTab from "@/components/tab/shortcut-tab";
import { getConversations } from "@/server/services/email";

const MailList = async () => {
  const conversations = await getConversations();

  return <ShortcutTab conversations={conversations.reverse()} />;
};

export default MailList;
