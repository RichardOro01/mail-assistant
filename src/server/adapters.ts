import { IMessage, IMessagePerson } from '@/types/imap';
import { FetchMessageObject } from 'imapflow';
import { AddressObject, ParsedMail } from 'mailparser';

export const emailAdapter = (parsedEmail: ParsedMail, fetchMessageObject: FetchMessageObject): IMessage => {
  const from: IMessagePerson = emailFromAdapter(parsedEmail.from);
  const to: IMessagePerson[] = emailToAdapter(parsedEmail.to);

  return {
    uid: fetchMessageObject.uid,
    to,
    from,
    date: parsedEmail.date,
    html: parsedEmail.html,
    messageId: parsedEmail.messageId,
    subject: parsedEmail.subject,
    text: parsedEmail.text,
    inReplyTo: parsedEmail.inReplyTo
  };
};

const emailToAdapter = (tos: AddressObject | AddressObject[] | undefined): IMessagePerson[] => {
  if (!tos) return [];
  if (Array.isArray(tos)) return tos.reduce((prev: IMessagePerson[], current) => [...prev, ...current.value], []);
  return tos.value;
};

const emailFromAdapter = (from: AddressObject | undefined): IMessagePerson => {
  return { address: from?.value[0]?.address, name: from?.value[0]?.name };
};
