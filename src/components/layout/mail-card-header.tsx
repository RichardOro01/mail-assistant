"use client";
import { Check, Clock, Trash } from "lucide-react";

type MailCardHeaderProps = {
  title: string | null;
};

const MailCardHeader: React.FC<MailCardHeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between">
      {title ? (
        <>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <div className="flex ml-2 gap-4 items-center">
            <button>
              <Check color="gray" size={18} />
            </button>
            <Clock color="gray" size={18} />
            <Trash color="gray" size={18} />
          </div>
        </>
      ) : (
        <h2 className="text-2xl font-semibold">New Message</h2>
      )}
    </div>
  );
};

export default MailCardHeader;
