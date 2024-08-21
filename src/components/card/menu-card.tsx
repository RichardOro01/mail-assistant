"use client";
import { IConversation } from "@/types/email";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface MenuCardProps {
  conversation: IConversation | undefined;
}

const MenuCard: React.FC<MenuCardProps> = ({ conversation }) => {
  return (
    <div
      className="h-screen max-w-[300px] min-w-[300px] border bg-slate-50 border-slate-100 lg:min-w-[400px]"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 14px 17px inset",
      }}
    >
      <div className="grid grid-rows-3[1fr] mx-8 lg:ml-10">
        <h3 className="my-8 font-semibold text-lg self-center">
          {conversation?.emails[0].from.name}
        </h3>
        <div className="flex items-center text-sm">
          <div className="w-16 h-16 rounded-full overflow-clip">
            <Avatar className="object-cover rounded-md">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col ml-3 gap-2">
            <p className="font-semibold">{conversation?.emails[0].from.name}</p>
            <p className="opacity-60">
              {conversation?.emails[0].date
                ? conversation?.emails[0].date.getDate()
                : ""}
            </p>
          </div>
        </div>
        <div className="mt-8 text-sm">{conversation?.tags}</div>
      </div>
    </div>
  );
};

export default MenuCard;
