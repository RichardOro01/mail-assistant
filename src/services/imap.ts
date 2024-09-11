import { createImapInstance } from '@/server/imap';
import { ImapFlowWithOptions } from '@/types/imap';
import { debugImap } from '../lib/debug';
import { createSmtpInstance } from '@/server/smtp';
import { addEmailInstance } from '@/server/email';
import { FetchError, StandardError } from './types';
import { isObjectWithProperties } from '@/lib/utils';

export const imapService = {
  auth: async (email: string, password: string) => {
    try {
      const imap = createImapInstance(email, password);
      debugImap('Imap connecting \x1b[34m', email);
      await imap.connect();
      debugImap('Imap open \x1b[34m', email);
      await imap.logout();
      const smtp = createSmtpInstance(email, password);
      addEmailInstance(imap as ImapFlowWithOptions, smtp);
    } catch (error) {
      if (isObjectWithProperties(error, ['authenticationFailed']) && error.authenticationFailed)
        throw {
          detail: { code: 'invalid_credentials', message: 'Invalid Credentials.' },
          status: 401,
          statusText: 'Invalid Credentials.'
        } as FetchError<StandardError>;
      else {
        console.error(error);
        throw {
          detail: { code: 'unknown', message: 'Something wen wrong.' },
          status: 500,
          statusText: 'Internal Server Error.'
        } as FetchError<StandardError>;
      }
    }
  },
  getMessages: (search?: string) => {
    console.log(search);
    // debugImap('Getting messages');
    // const messages: IMessageInfoImap[] = [];
    // return new Promise<IMessageInfoImap[]>(async (resolve, reject) => {
    //   const email = await getEmailInstance();
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
    //         console.log(messages.map(({ uid }) => uid));
    //         resolve(messages);
    //       } else setTimeout(finish, 100);
    //     };
    //     imap.once('ready', function () {
    //       imap.openBox('INBOX', true, function (err) {
    //         if (err) reject(err);
    //         debugImap('Searching', search);
    //         imap.search([['TEXT', search ?? '']], function (err, results) {
    //           if (err) reject(err);
    //           debugImap('Fetching messages');
    //           const reversedResults = results.reverse().slice(0, 20);
    //           const fetcher = imap.fetch(reversedResults, {
    //             bodies: '',
    //             struct: true
    //           });
    //           fetcher.on('message', function (msg) {
    //             let headerBuffer = '';
    //             let uid: number;
    //             msg.once('attributes', function (attrs) {
    //               uid = attrs.uid;
    //             });
    //             msg.on('body', function (stream) {
    //               stream.on('data', function (chunk) {
    //                 receiving = true;
    //                 headerBuffer += chunk.toString('utf8');
    //               });
    //               stream.once('end', async function () {
    //                 const parsed = await simpleParser(headerBuffer);
    //                 messages.push({
    //                   from: parsed.from?.value,
    //                   to: emailToAdapter(parsed.to),
    //                   date: parsed.date,
    //                   subject: parsed.subject,
    //                   html: parsed.html,
    //                   text: parsed.text,
    //                   id: parsed.messageId,
    //                   uid
    //                 });
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
