"use client";
import { IConversation } from "@/types/email";
import { format } from "date-fns";
import { Check, Clock, Ellipsis, Trash } from "lucide-react";
import { useParams } from "next/navigation";

type MailCardProps = {
  conversation: IConversation | undefined;
};

const MailCard: React.FC<MailCardProps> = ({ conversation }) => {
  const params = useParams<{ id: string }>();

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
      <div className="flex flex-col justify-between h-1/2 w-full shadow-lg border-l-4 border-slate-400 rounded-lg lg:min-w-[400px]">
        <div className="flex flex-col m-5 gap-5">
          <div className="flex justify-between">
            <h2 className="font-semibold text-lg">
              {conversation?.emails[0].from.name}
            </h2>
            <p className="opacity-50 text-lg">
              {conversation?.emails[0].date
                ? format(conversation.emails[0].date, "hh:mm a")
                : ""}
            </p>
          </div>
          <div className="">{conversation?.emails[0].text}</div>
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
