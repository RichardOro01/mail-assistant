import { _conversations } from "@/_mock/_email";
import ShortcutTab from "@/components/tab/shortcut-tab";

const MailList = async () => {
  return <ShortcutTab conversations={_conversations} />;
};

export default MailList;
