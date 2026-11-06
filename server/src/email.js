import nodemailer from 'nodemailer';
let transport;
function mailer() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_FROM) throw new Error('Email delivery is not configured');
  transport ||= nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } : undefined
  });
  return transport;
}
export async function sendLink(to, subject, path, token) {
  const base = process.env.PUBLIC_APP_URL;
  if (!base || !/^https:\/\//.test(base) && process.env.NODE_ENV === 'production') throw new Error('PUBLIC_APP_URL must use HTTPS in production');
  const url = new URL(path, base || 'http://localhost:5173');
  url.searchParams.set('token', token);
  await mailer().sendMail({ from: process.env.SMTP_FROM, to, subject, text: `Open this link to continue: ${url.href}\nIf you did not request this, ignore this message.` });
}
