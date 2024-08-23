import { useState, useRef, useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const MailCardCompose = () => {
  const [text, setText] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  return (
    <div className="flex flex-col m-5 gap-3">
      <div className="flex items-center gap-4 mb-4">
        <Label htmlFor="to" className="text-lg font-semibold">
          To
        </Label>
        <Input
          id="to"
          type="text"
          className="flex-1 bg-transparent text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-gray-400"
        />
      </div>
      <Input
        type="text"
        placeholder="Subject"
        className="w-full px-0 mb-4 text-lg font-bold border-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Textarea
        ref={textareaRef}
        value={text}
        placeholder="Say hello"
        onChange={(e) => setText(e.target.value)}
        rows={5}
        className="w-full px-0 text-lg font-medium resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{ overflow: "hidden" }}
      />
    </div>
  );
};

export default MailCardCompose;
