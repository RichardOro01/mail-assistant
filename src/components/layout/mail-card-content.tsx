"use client";
import { IConversation } from "@/types/email";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import { Separator } from "../ui/separator";

type MailCardContentProps = {
  conversation: IConversation;
};

const MailCardContent: React.FC<MailCardContentProps> = ({ conversation }) => {
  return (
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
              __html: `${DOMPurify.sanitize(conversation ? email.html : "")}`,
            }}
            className="mt-2 text-sm"
          ></div>
          {index !== conversation?.emails.length - 1 && (
            <Separator className="mt-6" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MailCardContent;
