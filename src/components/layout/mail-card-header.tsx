"use client";
import { Check, Clock, Trash } from "lucide-react";

type MailCardHeaderProps = {
  write: boolean;
  title: string;
};

const MailCardHeader: React.FC<MailCardHeaderProps> = ({ write, title }) => {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {!write && (
        <div className="flex ml-2 gap-4 items-center">
          <button>
            <Check color="gray" size={18} />
          </button>
          <Clock color="gray" size={18} />
          <Trash color="gray" size={18} />
        </div>
      )}
    </div>
  );
};

export default MailCardHeader;
