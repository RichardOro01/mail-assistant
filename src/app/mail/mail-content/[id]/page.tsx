"use client";
import MailCard from "@/components/card/mail-card";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { _conversations } from "@/_mock/_email";
import { useContext, useEffect } from "react";
import { MailSelected } from "../../layout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const MailContent: React.FC<any> = ({ params }) => {
  const { selectedMail, setSelectedMail, selectConversation } =
    useContext(MailSelected);

  const router = useRouter();

  // useEffect(() => {
  //   setSelectedMail(
  //     _conversations.find((conversation) => conversation.id === params.id)
  //   );
  // }, [params]);

  const switchPreviousConv = () => {
    let conv = Number(params.id);
    if (conv > 1) {
      conv = conv - 1;
      selectConversation(conv.toString());
    }
  };

  const switchNextConv = () => {
    let conv = Number(params.id);
    if (conv < _conversations.length) {
      conv += 1;
      selectConversation(conv.toString());
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center gap-10 h-full bg-slate-50 p-7">
        <div className="flex flex-col gap-6 p-1 rounded-full border bg-white shadow-md">
          <Button
            className="rounded-full"
            variant="link"
            size="icon"
            onClick={() => router.push("/mail/mail-list")}
          >
            <ChevronLeft color="gray" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 px-2 py-4 rounded-full border bg-white shadow-md">
          <Button
            className="rounded-full"
            variant="link"
            size="icon"
            onClick={switchPreviousConv}
          >
            <ChevronUp color="gray" />
          </Button>
          <Button
            className="rounded-full"
            variant="link"
            size="icon"
            onClick={switchNextConv}
          >
            <ChevronDown color="gray" />
          </Button>
        </div>
      </div>
      <MailCard conversation={selectedMail} />
    </div>
  );
};

export default MailContent;
