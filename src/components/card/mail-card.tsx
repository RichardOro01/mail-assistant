"use client";
import { MailSelected } from "@/app/mail/layout";
import { IConversation } from "@/types/email";
import { useContext, useEffect } from "react";
import MailCardHeader from "../layout/mail-card-header";
import MailCardFooter from "../layout/mail-card-footer";
import MailCardContent from "../layout/mail-card-content";
import MailCardCompose from "../layout/mail-card-compose";

type MailCardProps = {
  conversation?: IConversation;
  write: boolean;
};

const MailCard: React.FC<MailCardProps> = ({ conversation, write }) => {
  const { setSelectedMail } = useContext(MailSelected);

  useEffect(() => {
    setSelectedMail(conversation);
  }, [setSelectedMail, conversation]);

  return (
    <div className="flex flex-col w-screen gap-8 mx-20 my-10">
      <MailCardHeader
        write={write}
        title={conversation ? conversation.subject : "New Message"}
      />
      <div className="flex flex-col justify-between shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px]">
        {conversation ? (
          <MailCardContent conversation={conversation} />
        ) : (
          <MailCardCompose />
        )}
        <MailCardFooter write={write} />
      </div>
    </div>
  );
};

export default MailCard;
