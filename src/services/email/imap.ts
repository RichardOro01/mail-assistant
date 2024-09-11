import { createImapInstance } from '@/server/imap';
import { debugImap } from '../../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { addEmailInstance, getEmailInstance } from '@/server/email';
import { FetchError, StandardError } from '../types';
import { isObjectWithProperties } from '@/lib/utils';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { emailAdapter } from '@/server/adapters';
import { IMessage } from '@/types/imap';

export const imapService = {
  auth: async (email: string, password: string) => {
    try {
      const imap = createImapInstance(email, password);
      debugImap('Imap connecting \x1b[34m', email);
      const connection = await imap.connect();
      debugImap('Imap open \x1b[34m', email);
      await connection.logout();
      const smtp = createSmtpInstance(email, password);
      const emailInstance = addEmailInstance(imap, smtp);
      return emailInstance;
    } catch (error) {
      if (isObjectWithProperties(error, ['authenticationFailed']) && error.authenticationFailed)
        throw {
          detail: { code: 'invalid_credentials', message: 'Invalid Credentials.' },
          status: 401,
          statusText: 'Invalid Credentials.'
        } as FetchError<StandardError>;
      else {
        console.log(error);
        throw {
          detail: { code: 'unknown', message: 'Something wen wrong.' },
          status: 500,
          statusText: 'Internal Server Error.'
        } as FetchError<StandardError>;
      }
    }
  },
  getMessages: async (search?: string) => {
    debugImap('Getting messages');
    const messages: IMessage[] = [];
    const email = await getEmailInstance();
    if (!email) {
      debugImap('\x1b[31mRejecting cause no email instance');
      throw {
        detail: { code: 'email_instance_not_found', message: 'No email instance' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const { imap } = email;
    let connection: ImapFlow;
    try {
      connection = await imap.connect();
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'imap_connect_error', message: 'Something went wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    }
    const lock = await connection.getMailboxLock('INBOX');
    try {
      debugImap('Searching', search);
      const list = (await connection.search({ ...(search ? { body: search } : {}) })) || [];
      const reverseList = list.reverse().slice(0, 20);

      debugImap('Fetching messages');
      for await (const message of connection.fetch(reverseList, {
        source: true
      })) {
        const parsed = await simpleParser(message.source);
        messages.push(emailAdapter(parsed, message));
      }
    } catch (error) {
      console.log(error);
      throw {
        detail: { code: 'unknown', message: 'Something wen wrong.' },
        status: 500,
        statusText: 'Internal Server Error.'
      } as FetchError<StandardError>;
    } finally {
      lock.release();
    }
    await connection.logout();
    return messages;
  },
  getMessageById: (id: string) => {
    console.log('Getting message by id', id);
    // return new Promise<IMessageInfoImap>(async (resolve, reject) => {
    //   const email = await getEmailInstance();
    //   let message: IMessageInfoImap;
    //   let receiving = true;
    //   if (!email) {
    //     debugImap('\x1b[31mRejecting cause no IMAP instance');
    //     reject({
    //       detail: { code: 'imap_instance_not_found', message: 'No imap instance' },
    //       status: 500,
    //       statusText: 'Internal Server Error.'
    //     } as FetchError<StandardError>);
    //   } else {
    //     const { imap } = email;
    //     const finish = () => {
    //       if (!receiving) {
    //         imap.end();
    //         resolve(message);
    //       } else setTimeout(finish, 100);
    //     };
    //     imap.once('ready', function () {
    //       imap.openBox('INBOX', true, function (err) {
    //         if (err) reject(err);
    //         const decodedID = decodeURIComponent(id);
    //         debugImap('Searching', decodedID);
    //         imap.search([['HEADER', 'Message-ID', decodedID]], function (err, results) {
    //           if (err) reject(err);
    //           debugImap('Fetching messages');
    //           const fetcher = imap.fetch(results[0], {
    //             bodies: '',
    //             struct: true
    //           });
    //           fetcher.on('message', function (msg) {
    //             let headerBuffer = '';
    //             msg.on('body', function (stream) {
    //               receiving = true;
    //               stream.on('data', function (chunk) {
    //                 headerBuffer += chunk.toString('utf8');
    //               });
    //               stream.once('end', async function () {
    //                 const parsed = await simpleParser(headerBuffer);
    //                 message = {
    //                   from: parsed.from?.value,
    //                   to: emailToAdapter(parsed.to),
    //                   date: parsed.date,
    //                   subject: parsed.subject,
    //                   html: parsed.html,
    //                   text: parsed.text,
    //                   id: parsed.messageId
    //                 };
    //                 message = message;
    //                 receiving = false;
    //               });
    //             });
    //           });
    //           fetcher.once('error', function (err) {
    //             imap.end();
    //             reject(err);
    //           });
    //           fetcher.once('end', function () {
    //             finish();
    //           });
    //         });
    //       });
    //     });
    //     imap.connect();
    //   }
    // });
  }
};
