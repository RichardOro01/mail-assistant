"use client";
import EmailsTable from "@/components/table/emails-table";
import { IConversation } from "@/types/email";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Dot, PencilLine, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";

type Shortcut = {
  id: string;
  name: string;
  amount: number | null;
};

type ShortcutsTabProp = {
  conversations: IConversation[];
};

const ShortcutsTab: React.FC<ShortcutsTabProp> = ({ conversations }) => {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: "1", name: "Importantes", amount: 3 },
    { id: "2", name: "Otros", amount: null },
  ]);

  useEffect(() => {
    localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
  }, [shortcuts]);

  //Funtion to add a new shortcut
  const addShortcut = (name: string) => {
    setShortcuts([
      ...shortcuts,
      { id: Date.now().toString(), name, amount: null },
    ]);
  };

  //Funtion to identify the shortcut content
  const filterConversations = (shortcut: string): IConversation[] => {
    if (shortcut === "Importantes") {
      return conversations.filter((conversation) =>
        conversation.tags.includes("work")
      );
    } else {
      return conversations.filter(
        (conversation) => !conversation.tags.includes("work")
      );
    }
  };

  return (
    <Tabs defaultValue="0" className="w-full">
      <div className="flex justify-between py-5 px-7 text-xl items-center sticky top-0 bg-white z-10">
        <div className="flex gap-5">
          <TabsList className="flex text-gray-500 items-center gap-1">
            {shortcuts.map((shortcut, index) => (
              <TabsTrigger
                key={shortcut.id}
                value={index.toString()}
                className="flex items-center data-[state=active]:text-black gap-1"
              >
                {shortcut.name}
                {index !== shortcuts.length - 1 && <Dot color="black" />}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="flex gap-6">
          <button onClick={() => addShortcut("Trabajo")}>
            <Plus color="gray" size={18} />
          </button>
          <PencilLine color="gray" size={18} />
          <Search color="gray" size={18} />
        </div>
      </div>
      {shortcuts.map((shortcut, index) => (
        <TabsContent key={index.toString()} value={index.toString()}>
          <EmailsTable conversations={conversations} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ShortcutsTab;
