import nodemailer from "nodemailer";
import {
  NEXTAUTH_PASSWORD_MINE,
  NEXT_SMTP_MAIL_SERVER_PORT,
  NEXT_MAIL_SERVER_HOST,
  NEXT_MINE_MAIL,
} from "@/config";

export const sendMessageSmtp = async (
  to: string,
  subject: string,
  message: string
) => {
  const transporter = nodemailer.createTransport({
    host: NEXT_MAIL_SERVER_HOST,
    port: Number(NEXT_SMTP_MAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: NEXT_MINE_MAIL,
      pass: NEXTAUTH_PASSWORD_MINE,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: `<${NEXT_MINE_MAIL}>`,
      to: to,
      subject: subject,
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
  }

  main().catch(console.error);
};
