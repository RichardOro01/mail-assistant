"use client";
import { MailSelected } from "@/app/mail/layout";
import { IConversation } from "@/types/email";
import { format } from "date-fns";
import { Check, Clock, Ellipsis, Trash } from "lucide-react";
import { useContext, useEffect } from "react";
import DOMPurify from "dompurify";
import { Separator } from "../ui/separator";

type MailCardProps = {
  conversation: IConversation | undefined;
};

const MailCard: React.FC<MailCardProps> = ({ conversation }) => {
  const { setSelectedMail } = useContext(MailSelected);

  useEffect(() => {
    setSelectedMail(conversation);
  }, [setSelectedMail, conversation]);

  return (
    <div className="flex flex-col w-full gap-7 mx-20 my-10">
      <div className="flex justify-between mx-6">
        <h2 className="text-xl font-semibold">{conversation?.subject}</h2>
        <div className="flex gap-5 items-center">
          <button>
            <Check color="gray" size={18} />
          </button>
          <Clock color="gray" size={18} />
          <Trash color="gray" size={18} />
        </div>
      </div>
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
        <div className="ml-5">
          <button>
            <Ellipsis />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailCard;
