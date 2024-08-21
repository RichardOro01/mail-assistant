import { ChatRequestOptions, Message } from "ai";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

interface UseChatMock {
  onFinish?: (message: Message) => void;
  initialMessages?: Message[];
}

export const useChatMock = ({
  onFinish,
  initialMessages,
}: UseChatMock = {}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? []);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );
  const handleSubmit = useCallback(
    (
      e: FormEvent<HTMLFormElement>,
      chatRequestOptions?: ChatRequestOptions
    ) => {
      e.preventDefault();
      const resAi: Message = {
        id: Math.random().toFixed(6),
        content: "Hola mi rey, gracias por escribirme",
        role: "assistant",
        createdAt: new Date(),
      };
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toFixed(6),
          content: input,
          role: "user",
          createdAt: new Date(),
        },
        resAi,
      ]);
      setInput("");
      onFinish?.(resAi);
    },
    [input, onFinish]
  );
  return { messages, input, handleInputChange, handleSubmit };
};
