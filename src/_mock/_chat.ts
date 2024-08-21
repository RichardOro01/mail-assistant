import { messages } from "@prisma/client";

export const _messages: messages[] = [
  {
    id: "1",
    content: "Estos son mensajes de prueba",
    conversation_id: "1",
    createdAt: new Date(),
    role: "user",
  },
  {
    id: "2",
    content: "Estos son mensajes de prueba",
    conversation_id: "1",
    createdAt: new Date(),
    role: "assistant",
  },
];
