'use server';

import nodemailer from 'nodemailer';
import { contactSchema, type ContactFormValues } from '@/lib/contact-schema';

// ─── Transporter ─────────────────────────────────────────────────────────────

function createTransporter() {
  if (process.env.NODE_ENV === 'development') {
    return nodemailer.createTransport({
      host: 'localhost',
      port: 1025,
      secure: false,
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

// ─── Action ───────────────────────────────────────────────────────────────────

export async function sendContactEmail(
  values: ContactFormValues
): Promise<{ success: boolean; error?: string }> {
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: 'Données invalides.' };
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER ?? 'contact@localhost'}>`,
      replyTo: email,
      to: process.env.SMTP_TO ?? 'dev@localhost',
      subject: `[Contact] ${subject}`,
      text: `De : ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
        <p><strong>Objet :</strong> ${subject}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('[sendContactEmail]', error);
    return { success: false, error: "L'envoi a échoué. Veuillez réessayer." };
  }
}
