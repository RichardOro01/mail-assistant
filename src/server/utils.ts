// import { getServerSession } from "next-auth";
import { debugImap } from '@/lib/debug';

export const checkEmail = async () => {
  debugImap('Checking email');
  debugImap('Getting session from server');
  // const session = await getServerSession();
  // const email = session?.user?.email;
  // if (!email) {
  //   debugImap("\x1b[31mNo email from server");
  //   throw new TRPCError({
  //     code: "UNAUTHORIZED",
  //     message: "Unauthorized request.",
  //   });
  // }
  debugImap('\x1b[32mEmail check successfully');
  //TODO check return
  return true;
};

// export const conversationAdapter = (
//   messages: IMessageInfoImap[]
// ): IConversation[] => {
//   return messages.map((message, i) => ({
//     read: true,
//     emails: [
//       {
//         date: message.date,
//         id: "we",
//         from: {
//           email: message.from?.[0].address || "",
//           name: message.from?.[0].name || "",
//         },
//         to: [
//           {
//             email: message.to?.[0].address || "",
//             name: message.to?.[0].name || "------",
//           },
//         ],
//         html: message.html || "",
//         text: message.text || "",
//       },
//     ],
//     subject: message.subject || "",
//     id: `${i}`,
//     tags: [],
//   }));
// };
