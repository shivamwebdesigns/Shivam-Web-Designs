import { NextRequest, NextResponse } from 'next/server';
import {
  adminPasswordCookieName,
  adminPasswordSessionDurationSeconds,
  checkAdminPassword,
  createAdminPasswordSession,
  getAdminPasswordConfig,
} from '@/lib/admin-password';
import { isAdminPasswordLengthValid } from '@/lib/admin-password-policy';
import { verifyAdminIdToken } from '@/lib/admin-auth';
import {
  getFirebaseAdminConfigStatus,
  getFirebaseErrorCode,
} from '@/lib/firebase/admin';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function unauthorized() {
  return NextResponse.json({ error: 'Sign in to unlock the dashboard.' }, { status: 401 });
}

function unavailable() {
  return NextResponse.json(
    { error: 'The admin password is not configured on this deployment.' },
    { status: 503 }
  );
}

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) {
    return unauthorized();
  }

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

  if (identity.kind === 'misconfigured') {
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
    return unavailable();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Enter a valid password.' }, { status: 400 });
  }

  const submittedPassword =
    typeof body === 'object' && body !== null && 'password' in body
      ? body.password
      : undefined;
  if (
    typeof submittedPassword !== 'string' ||
    !isAdminPasswordLengthValid(submittedPassword)
  ) {
    return NextResponse.json({ error: 'Enter a valid password.' }, { status: 400 });
  }

  let result;
  try {
    result = await checkAdminPassword(
      identity.uid,
      submittedPassword,
      passwordConfig.password
    );
  } catch (error) {
    console.error('[SWD_ADMIN_PASSWORD_CHECK_ERROR]', {
      name: error instanceof Error ? error.name : 'UnknownError',
      code: getFirebaseErrorCode(error),
      ...getFirebaseAdminConfigStatus(),
    });
    return NextResponse.json(
      { error: 'The admin password service is temporarily unavailable.' },
      { status: 503 }
    );
  }

  if (result.kind === 'locked') {
    return NextResponse.json(
      { error: 'Too many incorrect password attempts. Try again later.' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'private, no-store',
          'Retry-After': String(result.retryAfterSeconds),
        },
      }
    );
  }
  if (result.kind === 'invalid') {
    return NextResponse.json(
      { error: 'Incorrect password.' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const response = NextResponse.json(
    { success: true },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
  response.cookies.set(
    adminPasswordCookieName,
    createAdminPasswordSession(identity.uid, passwordConfig.sessionSecret),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/admin',
      maxAge: adminPasswordSessionDurationSeconds,
    }
  );
  return response;
}

export async function DELETE() {
  const response = NextResponse.json(
    { success: true },
    { headers: { 'Cache-Control': 'private, no-store' } }
  );
  response.cookies.set(adminPasswordCookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/api/admin',
    maxAge: 0,
  });
  return response;
}
