import { checkEmail, conversationAdapter, messageAdapter } from '../server/utils';
import { debugImap } from '@/lib/debug';
import { imapService } from './imap';

export const getConversations = async () => {
  debugImap('Getting conversations');
  await checkEmail();
  const messages = await imapService.getMessages();
  debugImap(`\x1b[32mConversations success (${messages.length} messages)`);
  return conversationAdapter(messages);
};

export const getEmailById = async (id: string) => {
  debugImap('Getting conversations');
  await checkEmail();
  const message = await imapService.getMessageById(id);
  debugImap('\x1b[32mMessage found)');
  return messageAdapter(message);
};
