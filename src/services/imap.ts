import { createImapInstance } from '@/server/imap';
import { IMessageInfoImap, ImapWithConfig } from '@/types/imap';
import { debugImap } from '../lib/debug';
import { simpleParser } from 'mailparser';
import { emailToAdapter } from '@/server/utils';
import { createSmtpInstance } from '@/server/smtp';
import { addEmailInstance, getEmailInstance } from '@/server/email';
import { FetchError, StandardError } from './types';

export const imapService = {
  auth: (email: string, password: string) => {
    const imap = createImapInstance(email, password) as ImapWithConfig;

    return new Promise<ImapWithConfig>((resolve, reject) => {
      imap.once('ready', () => {
        const smtp = createSmtpInstance(email, password);
        addEmailInstance(imap, smtp);
        debugImap('Imap open \x1b[34m', email);
        imap.end();
        resolve(imap);
      });
      imap.once('end', () => {
        //TODO check remove instance
        debugImap('Imap closed \x1b[34m', email);
      });
      //TODO fix type
      imap.once('error', (error: { textCode: string }) => {
        if (error.textCode === 'AUTHENTICATIONFAILED')
          reject({
            detail: { code: 'invalid_credentials', message: 'Invalid Credentials.' },
            status: 401,
            statusText: 'Invalid Credentials.'
          } as FetchError<StandardError>);
        else {
          console.error(error);
          reject({
            detail: { code: 'unknown', message: 'Something wen wrong.' },
            status: 500,
            statusText: 'Internal Server Error.'
          } as FetchError<StandardError>);
        }
        imap.end();
      });
      debugImap('Imap connecting \x1b[34m', email);
      imap.connect();
    });
  },
  getMessages: (search?: string) => {
    debugImap('Getting messages');
    const messages: IMessageInfoImap[] = [];
    return new Promise<IMessageInfoImap[]>(async (resolve, reject) => {
      const email = await getEmailInstance();
      let receiving = true;
      if (!email) {
        debugImap('\x1b[31mRejecting cause no IMAP instance');
        reject({
          detail: { code: 'imap_instance_not_found', message: 'No imap instance' },
          status: 500,
          statusText: 'Internal Server Error.'
        } as FetchError<StandardError>);
      } else {
        const { imap } = email;
        const finish = () => {
          if (!receiving) {
            imap.end();
            resolve(messages);
          } else setTimeout(finish, 100);
        };
        imap.once('ready', function () {
          imap.openBox('INBOX', true, function (err) {
            if (err) throw err;
            debugImap('Searching', search);
            imap.seq.search([['TEXT', search ?? '']], function (err, results) {
              if (err) throw err;
              debugImap('Fetching messages');
              const reversedResults = results.reverse().slice(0, 20);
              const fetcher = imap.seq.fetch(reversedResults, {
                bodies: '',
                struct: true
              });
              fetcher.on('message', function (msg) {
                let headerBuffer = '';
                msg.on('body', function (stream) {
                  stream.on('data', function (chunk) {
                    receiving = true;
                    headerBuffer += chunk.toString('utf8');
                  });
                  stream.once('end', async function () {
                    const parsed = await simpleParser(headerBuffer);
                    messages.push({
                      from: parsed.from?.value,
                      to: emailToAdapter(parsed.to),
                      date: parsed.date,
                      subject: parsed.subject,
                      html: parsed.html,
                      text: parsed.text,
                      id: parsed.messageId
                    });
                    receiving = false;
                  });
                });
              });
              fetcher.once('error', function (err) {
                console.log(err);
                imap.end();
                reject(err);
              });
              fetcher.once('end', function () {
                finish();
              });
            });
          });
        });
        imap.connect();
      }
    });
  },
  getMessageById: (id: string) => {
    return new Promise<IMessageInfoImap>(async (resolve, reject) => {
      const email = await getEmailInstance();
      let message: IMessageInfoImap;
      let receiving = true;

      if (!email) {
        debugImap('\x1b[31mRejecting cause no IMAP instance');
        reject({
          detail: { code: 'imap_instance_not_found', message: 'No imap instance' },
          status: 500,
          statusText: 'Internal Server Error.'
        } as FetchError<StandardError>);
      } else {
        const { imap } = email;
        const finish = () => {
          if (!receiving) {
            imap.end();
            resolve(message);
          } else setTimeout(finish, 100);
        };
        imap.once('ready', function () {
          imap.openBox('INBOX', true, function (err) {
            if (err) throw err;
            const decodedID = decodeURIComponent(id);
            debugImap('Searching', decodedID);
            imap.search([['HEADER', 'Message-ID', decodedID]], function (err, results) {
              if (err) throw err;
              debugImap('Fetching messages');
              const fetcher = imap.seq.fetch(results[0], {
                bodies: '',
                struct: true
              });
              fetcher.on('message', function (msg) {
                let headerBuffer = '';
                msg.on('body', function (stream) {
                  receiving = true;
                  stream.on('data', function (chunk) {
                    headerBuffer += chunk.toString('utf8');
                  });
                  stream.once('end', async function () {
                    const parsed = await simpleParser(headerBuffer);
                    message = {
                      from: parsed.from?.value,
                      to: emailToAdapter(parsed.to),
                      date: parsed.date,
                      subject: parsed.subject,
                      html: parsed.html,
                      text: parsed.text,
                      id: parsed.messageId
                    };
                    message = message;
                    receiving = false;
                  });
                });
              });
              fetcher.once('error', function (err) {
                console.log(err);
                imap.end();
                reject(err);
              });
              fetcher.once('end', function () {
                finish();
              });
            });
          });
        });
        imap.connect();
      }
    });
  }
};
