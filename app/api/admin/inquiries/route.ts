import { NextResponse } from 'next/server';
import {
  adminPasswordCookieName,
  getAdminPasswordConfig,
  isValidAdminPasswordSession,
} from '@/lib/admin-password';
import { verifyAdminIdToken } from '@/lib/admin-auth';
import {
  getFirebaseAdminConfigStatus,
  getFirebaseAdminDb,
  getFirebaseErrorCode,
} from '@/lib/firebase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const pageSize = 50;

function unauthorized() {
  return NextResponse.json({ error: 'Sign in to view inquiries.' }, { status: 401 });
}

function unavailable() {
  return NextResponse.json(
    { error: 'The inquiry dashboard is not configured yet.' },
    { status: 503 }
  );
}

export async function GET(request: Request) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return unauthorized();
  }

  const adminEmail = process.env.FIREBASE_ADMIN_EMAIL?.trim().toLowerCase();
  let identity;
  try {
    identity = await verifyAdminIdToken(token);
  } catch (error) {
    console.error('[SWD_ADMIN_FIREBASE_INIT_ERROR]', {
      name: error instanceof Error ? error.name : 'UnknownError',
      code: getFirebaseErrorCode(error),
      ...getFirebaseAdminConfigStatus(),
    });
    return unavailable();
  }

  if (identity.kind === 'misconfigured' || !adminEmail) {
    console.error('[SWD_ADMIN_CONFIG_ERROR]', {
      reason: 'missing_admin_email',
      ...getFirebaseAdminConfigStatus(),
    });
    return unavailable();
  }
  if (identity.kind === 'unauthorized') {
    return unauthorized();
  }
  if (identity.kind === 'forbidden') {
    return NextResponse.json(
      { error: 'This Google account is not authorized to view inquiries.' },
      { status: 403 }
    );
  }

  let passwordConfig;
  try {
    passwordConfig = getAdminPasswordConfig();
  } catch {
    console.error('[SWD_ADMIN_PASSWORD_CONFIG_ERROR]', {
      reason: 'invalid_or_missing_password_configuration',
    });
    return NextResponse.json(
      { error: 'The admin password is not configured on this deployment.' },
      { status: 503 }
    );
  }

  const passwordSession = request.headers
    .get('cookie')
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${adminPasswordCookieName}=`))
    ?.slice(adminPasswordCookieName.length + 1);
  if (
    !isValidAdminPasswordSession(
      identity.uid,
      passwordSession,
      passwordConfig.sessionSecret
    )
  ) {
    return NextResponse.json(
      { error: 'Enter your admin password to view inquiries.' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  try {
    const collection = getFirebaseAdminDb().collection('inquiries');
    let query = collection.orderBy('createdAt', 'desc').limit(pageSize + 1);
    const cursor = new URL(request.url).searchParams.get('cursor');

    if (cursor) {
      if (!/^[A-Za-z0-9_-]{1,150}$/.test(cursor)) {
        return NextResponse.json({ error: 'Invalid page cursor.' }, { status: 400 });
      }

      const cursorDocument = await collection.doc(cursor).get();
      if (!cursorDocument.exists) {
        return NextResponse.json({ error: 'Invalid page cursor.' }, { status: 400 });
      }

      query = query.startAfter(cursorDocument);
    }

    const snapshot = await query.get();
    const hasMore = snapshot.docs.length > pageSize;
    const documents = snapshot.docs.slice(0, pageSize);
    const inquiries = documents.map((document) => {
      const data = document.data();
      const createdAt =
        data.createdAt && typeof data.createdAt.toDate === 'function'
          ? data.createdAt.toDate().toISOString()
          : null;

      return {
        id: document.id,
        kind: data.kind === 'contact' ? 'contact' : 'project',
        name: data.name,
        email: data.email,
        company: data.company ?? '',
        projectType: data.projectType ?? '',
        budget: data.budget ?? '',
        timeline: data.timeline ?? '',
        description: data.description ?? '',
        referenceUrl: data.referenceUrl ?? '',
        additionalRequirements: data.additionalRequirements ?? '',
        subject: data.subject ?? '',
        message: data.message ?? '',
        emailStatus: data.emailStatus ?? 'pending',
        createdAt,
      };
    });

    return NextResponse.json(
      {
        inquiries,
        nextCursor: hasMore ? documents[documents.length - 1]?.id ?? null : null,
      },
      { headers: { 'Cache-Control': 'private, no-store' } }
    );
  } catch (error) {
    console.error('[SWD_ADMIN_INQUIRIES_READ_ERROR]', {
      name: error instanceof Error ? error.name : 'UnknownError',
      code: getFirebaseErrorCode(error),
      ...getFirebaseAdminConfigStatus(),
    });
    return unavailable();
  }
}
