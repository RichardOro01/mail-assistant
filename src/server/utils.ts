// import { getServerSession } from "next-auth";
import { IMessageInfoImap, IMessagePerson } from '@/types/imap';
import { IConversation } from '@/types/email';
import { AddressObject } from 'mailparser';
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

export const conversationAdapter = (messages: IMessageInfoImap[]): IConversation[] => {
  return messages.map((message, i) => {
    const to = message.to;
    if (Array.isArray(to)) {
      return {
        read: true,
        emails: [
          {
            date: message.date,
            id: 'we',
            from: {
              email: message.from?.[0].address || '',
              name: message.from?.[0].name || ''
            },
            to: to.map((toPerson) => ({
              email: toPerson.address || '',
              name: toPerson.name || ''
            })),
            html: message.html || '',
            text: message.text || ''
          }
        ],
        subject: message.subject || '',
        id: `${i}`,
        tags: []
      };
    } else {
      return {
        read: true,
        emails: [
          {
            date: message.date,
            id: 'we',
            from: {
              email: message.from?.[0].address || '',
              name: message.from?.[0].name || ''
            },
            to: [],
            html: message.html || '',
            text: message.text || ''
          }
        ],
        subject: message.subject || '',
        id: `${i}`,
        tags: []
      };
    }
  });
};

export const emailToAdapter = (tos: AddressObject | AddressObject[] | undefined): IMessagePerson[] => {
  if (!tos) return [];
  if (Array.isArray(tos)) return tos.reduce((prev: IMessagePerson[], current) => [...prev, ...current.value], []);
  return tos.value;
};
