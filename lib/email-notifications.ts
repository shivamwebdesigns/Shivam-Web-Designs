export type EmailNotificationStatus = 'sent' | 'not_configured' | 'failed';

interface EmailNotification {
  replyTo: string;
  subject: string;
  text: string;
}

export async function sendEmailNotification({
  replyTo,
  subject,
  text,
}: EmailNotification): Promise<EmailNotificationStatus> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim();

  if (!apiKey || !fromEmail) {
    return 'not_configured';
  }

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [process.env.CONTACT_EMAIL?.trim() || 'shivamwebdesigns23@gmail.com'],
        reply_to: replyTo,
        subject,
        text,
      }),
    });
  } catch {
    console.error('[SWD_EMAIL_NETWORK_ERROR]');
    return 'failed';
  }

  if (!response.ok) {
    console.error('[SWD_EMAIL_PROVIDER_ERROR]', { status: response.status });
    return 'failed';
  }

  return 'sent';
}
