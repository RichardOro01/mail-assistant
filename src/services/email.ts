// import { z } from "zod";
// import { publicProcedure } from "../trpc";
import { checkEmail, conversationAdapter } from '../server/utils';
import { getMessageImap } from '@/services/imap-service';
import { debugImap } from '@/lib/debug';

// export const getConversationss = publicProcedure
//   .input(z.string().optional())
//   .query(async ({ input }) => {
//     debugImap("Getting conversations");
//     await checkEmail();
//     const messages = await getMessageImap(input);
//     debugImap(`\x1b[32mConversations success (${messages.length} messages)`);
//     return conversationAdapter(messages);
//   });

export const getConversations = async () => {
  debugImap('Getting conversations');
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
  debugImap('\x1b[32mConversation by id success');
  return conversations.find((conversation) => conversation.id === idConversation);
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
