import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/lib/email-notifications';
import {
  getFirebaseAdminConfigStatus,
  getFirebaseErrorCode,
} from '@/lib/firebase/admin';
import { saveInquiry, updateInquiryEmailStatus } from '@/lib/inquiry-store';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function singleLine(value: string, maxLength: number) {
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.' },
      { status: 400 }
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object.' },
      { status: 400 }
    );
  }

  const { name, email, subject, message, honeypot } = payload;
  if (typeof honeypot === 'string' && honeypot.trim()) {
    return NextResponse.json({ success: true, message: 'Message received.' });
  }

  if (typeof name !== 'string' || !name.trim() || name.trim().length > 120) {
    return NextResponse.json(
      { error: 'A name of 1–120 characters is required.' },
      { status: 400 }
    );
  }

  if (
    typeof email !== 'string' ||
    email.trim().length > 254 ||
    !/^\S+@\S+\.\S+$/.test(email.trim())
  ) {
    return NextResponse.json(
      { error: 'A valid email address is required.' },
      { status: 400 }
    );
  }

  if (
    typeof message !== 'string' ||
    message.trim().length < 5 ||
    message.trim().length > 3000
  ) {
    return NextResponse.json(
      { error: 'Message must be between 5 and 3,000 characters.' },
      { status: 400 }
    );
  }

  if (
    subject !== undefined &&
    (typeof subject !== 'string' || subject.trim().length > 150)
  ) {
    return NextResponse.json(
      { error: 'Subject must be 150 characters or fewer.' },
      { status: 400 }
    );
  }

  const nameValue = singleLine(name, 120);
  const emailValue = email.trim().toLowerCase();
  const subjectValue =
    typeof subject === 'string' && subject.trim()
      ? singleLine(subject, 150)
      : 'General Inquiry';
  const messageValue = message.trim();

  let inquiryId: string;
  try {
    inquiryId = await saveInquiry({
      kind: 'contact',
      name: nameValue,
      email: emailValue,
      subject: subjectValue,
      message: messageValue,
    });
  } catch (error) {
    console.error('[SWD_CONTACT_STORAGE_ERROR]', {
      name: error instanceof Error ? error.name : 'UnknownError',
      code: getFirebaseErrorCode(error),
      ...getFirebaseAdminConfigStatus(),
    });
    return NextResponse.json(
      { error: 'We could not save your message right now. Please try again.' },
      { status: 503 }
    );
  }

  const emailStatus = await sendEmailNotification({
    replyTo: emailValue,
    subject: `[Contact Form] ${subjectValue} from ${nameValue}`,
    text: `From: ${nameValue} <${emailValue}>\n\nMessage:\n${messageValue}`,
  });

  try {
    await updateInquiryEmailStatus(inquiryId, emailStatus);
  } catch (error) {
    console.error('[SWD_CONTACT_STATUS_UPDATE_ERROR]', {
      inquiryId,
      name: error instanceof Error ? error.name : 'UnknownError',
      code: getFirebaseErrorCode(error),
    });
  }

  return NextResponse.json({
    success: true,
    message: 'Message received.',
    emailSent: emailStatus === 'sent',
  });
}
