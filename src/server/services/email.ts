// import { z } from "zod";
// import { publicProcedure } from "../trpc";
import { checkEmail, conversationAdapter } from "../utils";
import { getMessageImap } from "@/lib/services/imap-service";
import { debugImap } from "@/lib/debug";
import { sendMessageSmtp } from "@/lib/services/smtp-service";

// export const getConversationss = publicProcedure
//   .input(z.string().optional())
//   .query(async ({ input }) => {
//     debugImap("Getting conversations");
//     await checkEmail();
//     const messages = await getMessageImap(input);
//     debugImap(`\x1b[32mConversations success (${messages.length} messages)`);
//     return conversationAdapter(messages);
//   });

export const getConversations = async (search?: string) => {
  debugImap("Getting conversations");
  await checkEmail();
  const messages = await getMessageImap();
  debugImap(`\x1b[32mConversations success (${messages.length} messages)`);
  return conversationAdapter(messages);
};

// export const getConversationById = publicProcedure
//   .input(z.string())
//   .query(async (options: any) => {
//     debugImap(`Getting conversation by id: ${options.input}`);
//     await checkEmail();
//     const messages = await getMessageImap();
//     const conversations = conversationAdapter(messages);
//     debugImap(`\x1b[32mConversation by id success`);
//     return conversations.find(
//       (conversation) => conversation.id === options.input
//     );
//   });

export const getConversationById = async (idConversation: string) => {
  debugImap(`Getting conversation by id: ${idConversation}`);
  const messages = await getMessageImap();
  const conversations = conversationAdapter(messages);
  debugImap(`\x1b[32mConversation by id success`);
  return conversations.find(
    (conversation) => conversation.id === idConversation
  );
};

// export const sendEmail = publicProcedure
//   .input(z.string())
//   .mutation(async (options) => {
//     await new Promise((resolve) => {
//       const message = sendMessageSmtp(options.input);
//       console.log(message);
//       resolve(0);
//     });
//   });

export const sendEmail = (to: string, subject: string, message: string) => {
  const sended = sendMessageSmtp(to, subject, message);
  console.log(sended);
};
