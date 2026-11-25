import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot spam trap
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: 'Message dispatched successfully.',
      });
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return NextResponse.json(
        { error: 'Message must be at least 5 characters.' },
        { status: 400 }
      );
    }

    console.log('[SWD_CONTACT_MESSAGE_RECEIVED]', {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject?.trim() || 'General Inquiry',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    });

    // Optional email dispatch hook if Resend key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'shivamwebdesigns23@gmail.com';

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'ShivamWebDesigns Contact <contact@shivamwebdesigns.com>',
            to: [recipientEmail],
            reply_to: email,
            subject: `[Contact Form] ${subject || 'New Message'} from ${name}`,
            text: `From: ${name} <${email}>\n\nMessage:\n${message}`,
          }),
        });
      } catch (mailError) {
        console.error('[SWD_CONTACT_MAIL_ERROR]', mailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message dispatched successfully.',
    });
  } catch (error) {
    console.error('[SWD_API_CONTACT_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error processing contact message.' },
      { status: 500 }
    );
  }
}
