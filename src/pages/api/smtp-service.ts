// import nodemailer from 'nodemailer';
// import { NEXTAUTH_PASSWORD_MINE, NEXT_SMTP_MAIL_SERVER_PORT, NEXT_MAIL_SERVER_HOST, NEXT_MINE_MAIL } from '@/config';

// const sendEmail = async (req: any, res: any) => {
//   const { to, subject, text } = req.body;

//   try {
//     const transporter = nodemailer.createTransport({
//       host: NEXT_MAIL_SERVER_HOST,
//       port: Number(NEXT_SMTP_MAIL_SERVER_PORT),
//       secure: false,
//       auth: {
//         user: NEXT_MINE_MAIL,
//         pass: NEXTAUTH_PASSWORD_MINE
//       }
//     });

//     const info = await transporter.sendMail({
//       from: `<${NEXT_MINE_MAIL}>`,
//       to: to,
//       subject: subject,
//       text: text
//     });

//     res.status(200).json({ messageId: info.messageId });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// };

// export default sendEmail;
