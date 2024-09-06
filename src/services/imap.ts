import { addImapInstance, createImapInstance } from '@/server/imap';
import { ImapWithConfig } from '@/types/imap';
import { debugImap } from '../lib/debug';
import { StandardError } from '@/lib/error/custom-error';

export const getMessageImap = (search?: string) => {
  console.log(search);
  // debugImap('Getting messages');
  // const messages: IMessageInfoImap[] = [];
  // return new Promise<IMessageInfoImap[]>(async (resolve, reject) => {
  //   const imap = createImapInstance(`${NEXT_MINE_MAIL}`, `${NEXTAUTH_PASSWORD_MINE}`) as ImapWithConfig;
  //   if (!imap) {
  //     debugImap('\x1b[31mRejecting cause no IMAP instance');
  //   } else {
  //     debugImap('Imap connecting \x1b[34m', NEXT_MINE_MAIL);
  //     imap.once('ready', () => {
  //       addImapInstance(imap);
  //       debugImap('Imap open \x1b[34m', NEXT_MINE_MAIL);
  //       imap.openBox('INBOX', true, function (err) {
  //         if (err) throw err;
  //         debugImap('Searching', search);
  //         imap.search([['TEXT', search ?? '']], function (err, results) {
  //           if (err) throw err;
  //           debugImap('Fetching messages');
  //           const reversedResults = results.reverse().slice(0, 20);
  //           const fetcher = imap.seq.fetch(reversedResults, {
  //             bodies: '',
  //             struct: true
  //           });
  //           fetcher.on('message', function (msg) {
  //             let headerBuffer = '';
  //             msg.on('body', function (stream) {
  //               stream.on('data', function (chunk) {
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
  //                   text: parsed.text
  //                 });
  //               });
  //             });
  //           });
  //           fetcher.once('error', function (err) {
  //             console.log(err);
  //             reject(err);
  //           });
  //           fetcher.once('end', function () {
  //             resolve(messages);
  //           });
  //         });
  //       });
  //     });
  //     imap.once('error', function (err: unknown) {
  //       console.log(err);
  //       reject(err);
  //     });
  //     imap.once('end', function () {
  //       debugImap('Connection ended');
  //     });
  //     imap.connect();
  //   }
  // });
  return [];
};

export const imapService = {
  auth: (email: string, password: string) => {
    const imap = createImapInstance(email, password) as ImapWithConfig;
    return new Promise<ImapWithConfig>((resolve, reject) => {
      imap.once('ready', () => {
        addImapInstance(imap);
        debugImap('Imap open \x1b[34m', email);
        resolve(imap);
      });
      imap.once('end', () => {
        //TODO check remove instance
        debugImap('Imap closed \x1b[34m', email);
      });
      //TODO fix type
      imap.once('error', (error: { textCode: string }) => {
        if (error.textCode === 'AUTHENTICATIONFAILED')
          reject(new StandardError('invalid_credentials', 'Invalid Credentials.'));
        reject(new StandardError('unknown', 'Something wen wrong.'));
      });
      debugImap('Imap connecting \x1b[34m', email);
      imap.connect();
    });
  }
};
