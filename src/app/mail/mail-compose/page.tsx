import MailCard from "@/components/card/mail-card";
import LeftBar from "@/components/sheet/left-bar";

const MailCompose = () => {
  return (
    <div className="flex w-full">
      <LeftBar />
      <MailCard write={true} />
    </div>
  );
};

export default MailCompose;
