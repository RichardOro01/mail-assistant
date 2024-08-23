"use client";
import { MailSelected } from "@/app/mail/layout";
import { IConversation } from "@/types/email";
import { useContext, useEffect } from "react";
import MailCardHeader from "../layout/mail-card-header";
import MailCardFooter from "../layout/mail-card-footer";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Separator } from "../ui/separator";

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
        <div className="flex flex-col m-5 gap-5">
          {conversation?.emails.map((email, index) => (
            <div key={email.id}>
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{email.from.name}</h2>
                <p className="opacity-50 text-lg">
                  {email.date ? format(email.date, "hh:mm a") : ""}
                </p>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${DOMPurify.sanitize(
                    conversation ? email.html : ""
                  )}`,
                }}
                className="mt-2 text-sm"
              ></div>
              {index !== conversation?.emails.length - 1 && (
                <Separator className="mt-6" />
              )}
            </div>
          ))}
        </div>
        <MailCardFooter write={write} />
      </div>
    </div>
  );
};

export default MailCard;
