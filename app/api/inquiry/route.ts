import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/lib/email-notifications';
import { saveInquiry, updateInquiryEmailStatus } from '@/lib/inquiry-store';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function singleLine(value: string, maxLength: number): string {
  return value.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: 'Request body must be a JSON object.' }, { status: 400 });
  }

  const {
    fullName,
    email,
    company,
    projectType,
    budget,
    timeline,
    description,
    referenceUrl,
    additionalRequirements,
    honeypot,
  } = payload;

  if (typeof honeypot === 'string' && honeypot.trim()) {
    return NextResponse.json({
      success: true,
      inquiryId: `SWD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      message: 'Inquiry registered',
    });
  }

  if (typeof fullName !== 'string' || !fullName.trim() || fullName.trim().length > 120) {
    return NextResponse.json({ error: 'A name of 1–120 characters is required.' }, { status: 400 });
  }

  if (typeof email !== 'string' || email.trim().length > 254 || !/^\S+@\S+\.\S+$/.test(email.trim())) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
  }

  if (typeof description !== 'string' || description.trim().length < 10 || description.trim().length > 2000) {
    return NextResponse.json(
      { error: 'Project description must be between 10 and 2,000 characters.' },
      { status: 400 }
    );
  }

  const optionalFields = [
    ['company', company, 160],
    ['project type', projectType, 100],
    ['budget', budget, 100],
    ['timeline', timeline, 100],
    ['reference URL', referenceUrl, 2048],
    ['additional notes', additionalRequirements, 1000],
  ] as const;

  for (const [label, value, maxLength] of optionalFields) {
    if (value !== undefined && typeof value !== 'string') {
      return NextResponse.json({ error: `Invalid ${label}.` }, { status: 400 });
    }

    if (typeof value === 'string' && value.trim().length > maxLength) {
      return NextResponse.json({ error: `${label} must be ${maxLength} characters or fewer.` }, { status: 400 });
    }
  }

  const fullNameValue = singleLine(fullName, 120);
  const emailValue = email.trim().toLowerCase();
  const companyValue = typeof company === 'string' ? singleLine(company, 160) : '';
  const projectTypeValue = typeof projectType === 'string' ? singleLine(projectType, 100) : 'General';
  const budgetValue = typeof budget === 'string' ? singleLine(budget, 100) : 'Flexible';
  const timelineValue = typeof timeline === 'string' ? singleLine(timeline, 100) : 'Flexible';
  const descriptionValue = description.trim();
  const referenceUrlValue = typeof referenceUrl === 'string' ? referenceUrl.trim() : '';
  const additionalRequirementsValue =
    typeof additionalRequirements === 'string' ? additionalRequirements.trim() : '';

  if (referenceUrlValue) {
    try {
      const url = new URL(referenceUrlValue);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return NextResponse.json({ error: 'Reference URL must use HTTP or HTTPS.' }, { status: 400 });
      }
    } catch {
      return NextResponse.json({ error: 'Please provide a valid reference URL.' }, { status: 400 });
    }
  }

  let inquiryId: string;
  try {
    inquiryId = await saveInquiry({
      kind: 'project',
      name: fullNameValue,
      email: emailValue,
      company: companyValue,
      projectType: projectTypeValue,
      budget: budgetValue,
      timeline: timelineValue,
      description: descriptionValue,
      referenceUrl: referenceUrlValue,
      additionalRequirements: additionalRequirementsValue,
    });
  } catch (error) {
    console.error('[SWD_INQUIRY_STORAGE_ERROR]', {
      name: error instanceof Error ? error.name : 'UnknownError',
    });
    return NextResponse.json(
      { error: 'We could not save your brief right now. Please try again.' },
      { status: 503 }
    );
  }

  const emailStatus = await sendEmailNotification({
    replyTo: emailValue,
    subject: `[Project Quotation Request] ${inquiryId}`,
    text: [
      'New Project Quotation Request',
      '',
      `Inquiry ID: ${inquiryId}`,
      `Client: ${fullNameValue}`,
      `Email: ${emailValue}`,
      `Company: ${companyValue || 'Not provided'}`,
      `Service: ${projectTypeValue}`,
      `Estimated investment (INR): ${budgetValue}`,
      `Timeline: ${timelineValue}`,
      `Reference URL: ${referenceUrlValue || 'Not provided'}`,
      '',
      'Project description:',
      descriptionValue,
      '',
      'Additional notes:',
      additionalRequirementsValue || 'None',
      '',
      'Submitted via https://shivamwebdesigns.devs.li/start-project',
    ].join('\n'),
  });

  try {
    await updateInquiryEmailStatus(inquiryId, emailStatus);
  } catch (error) {
    console.error('[SWD_INQUIRY_STATUS_UPDATE_ERROR]', {
      inquiryId,
      name: error instanceof Error ? error.name : 'UnknownError',
    });
  }

  return NextResponse.json({
    success: true,
    inquiryId,
    emailSent: emailStatus === 'sent',
    message: 'Your project brief was received.',
  });
}
