"use client";
import { Ellipsis } from "lucide-react";

type MailCardFooterProps = {
  write: boolean;
};

const MailCardFooter: React.FC<MailCardFooterProps> = ({ write }) => {
  return (
    <div className="ml-5">
      {write ? (
        <div className="flex gap-4 mb-4">
          <button className="font-semibold">Send</button>
          <button>Send later</button>
        </div>
      ) : (
        <button>
          <Ellipsis />
        </button>
      )}
    </div>
  );
};

export default MailCardFooter;
