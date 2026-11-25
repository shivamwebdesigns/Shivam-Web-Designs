import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    } = body;

    // Honeypot spam trap
    if (honeypot) {
      return NextResponse.json({
        success: true,
        inquiryId: `SWD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        message: 'Inquiry registered',
      });
    }

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Project description must be at least 10 characters.' },
        { status: 400 }
      );
    }

    const inquiryId = `SWD-${Date.now().toString(36).toUpperCase()}`;

    // Payload logging for server observability
    console.log('[SWD_INQUIRY_RECEIVED]', {
      inquiryId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || 'N/A',
      projectType: projectType || 'General',
      budget: budget || 'Flexible',
      timeline: timeline || 'Standard',
      description: description.trim(),
      referenceUrl: referenceUrl?.trim() || 'N/A',
      additionalRequirements: additionalRequirements?.trim() || 'N/A',
      timestamp: new Date().toISOString(),
    });

    // Optional email dispatch hook if Resend key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_EMAIL || 'shivam@shivamwebdesigns.com';

    if (resendApiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'ShivamWebDesigns Inquiries <inquiries@shivamwebdesigns.com>',
            to: [recipientEmail],
            reply_to: email,
            subject: `[New Project Inquiry] ${inquiryId}: ${fullName} (${projectType})`,
            text: `
New Project Inquiry Received

Inquiry ID: ${inquiryId}
Client: ${fullName}
Email: ${email}
Company: ${company || 'N/A'}
Service: ${projectType}
Budget: ${budget}
Timeline: ${timeline}
Reference URL: ${referenceUrl || 'None'}

Description:
${description}

Additional Requirements:
${additionalRequirements || 'None'}
            `,
          }),
        });
      } catch (mailError) {
        console.error('[SWD_MAIL_DISPATCH_ERROR]', mailError);
        // Do not fail user request if mail transport had an issue
      }
    }

    return NextResponse.json({
      success: true,
      inquiryId,
      message: 'Project inquiry successfully registered in dispatch queue.',
    });
  } catch (error) {
    console.error('[SWD_API_INQUIRY_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error processing inquiry.' },
      { status: 500 }
    );
  }
}
