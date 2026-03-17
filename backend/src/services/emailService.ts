import nodemailer from "nodemailer";
import env from "../config/env";

export interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465,
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

export const sendEmail = async ({
  to,
  subject,
  html,
  text,
}: SendEmailOptions): Promise<void> => {
  if (!to || !subject || (!html && !text)) {
    throw new Error("Missing email fields (to, subject, html/text)");
  }

  const startedAt = Date.now();
  console.log(
    `[email] Sending to=${to} subject="${subject}" host=${env.smtp.host} port=${env.smtp.port}`,
  );
  try {
    await transporter.sendMail({
      from: `Lifeline <${env.smtp.user}>`,
      to,
      subject,
      html,
      text,
    });
    console.log(`[email] Sent to=${to} in ${Date.now() - startedAt}ms`);
  } catch (error: any) {
    console.error(
      `[email] Failed to=${to} after ${Date.now() - startedAt}ms:`,
      error?.message || error,
    );
    throw error;
  }
};
