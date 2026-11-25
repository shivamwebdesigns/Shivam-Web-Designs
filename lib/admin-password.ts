import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { getFirebaseAdminDb } from '@/lib/firebase/admin';
import { isAdminPasswordLengthValid } from '@/lib/admin-password-policy';

export const adminPasswordCookieName = 'swd_admin_password_session';
export const adminPasswordSessionDurationSeconds = 30 * 60;

const attemptWindowMs = 15 * 60 * 1000;
const attemptLimit = 5;

interface AdminPasswordConfig {
  password: string;
  sessionSecret: string;
}

type PasswordAttemptResult =
  | { kind: 'accepted' }
  | { kind: 'invalid' }
  | { kind: 'locked'; retryAfterSeconds: number };

export function getAdminPasswordConfig(): AdminPasswordConfig {
  const password = process.env.ADMIN_PASSWORD;
  const sessionSecret = process.env.ADMIN_PASSWORD_SESSION_SECRET?.trim();

  if (
    !password ||
    !isAdminPasswordLengthValid(password) ||
    !sessionSecret ||
    Buffer.byteLength(sessionSecret) < 32
  ) {
    const error = new Error('Admin password configuration is invalid.');
    error.name = 'AdminPasswordConfigurationError';
    throw error;
  }

  return { password, sessionSecret };
}

export async function checkAdminPassword(
  uid: string,
  submittedPassword: string,
  expectedPassword: string
): Promise<PasswordAttemptResult> {
  const passwordMatches = timingSafeEqual(
    createHash('sha256').update(submittedPassword).digest(),
    createHash('sha256').update(expectedPassword).digest()
  );
  const attemptId = createHash('sha256').update(uid).digest('hex');
  const db = getFirebaseAdminDb();
  const attemptRef = db.collection('_adminPinRateLimits').doc(attemptId);

  return db.runTransaction(async (transaction) => {
    const attemptSnapshot = await transaction.get(attemptRef);
    const attemptData = attemptSnapshot.data();
    const now = Date.now();
    const lockedUntil =
      typeof attemptData?.lockedUntil === 'number' ? attemptData.lockedUntil : 0;

    if (lockedUntil > now) {
      return {
        kind: 'locked',
        retryAfterSeconds: Math.ceil((lockedUntil - now) / 1000),
      };
    }

    const windowStartedAt =
      typeof attemptData?.windowStartedAt === 'number'
        ? attemptData.windowStartedAt
        : now;
    const isWindowExpired = now - windowStartedAt >= attemptWindowMs;
    const attempts =
      isWindowExpired || typeof attemptData?.attempts !== 'number'
        ? 0
        : attemptData.attempts;

    if (passwordMatches) {
      transaction.delete(attemptRef);
      return { kind: 'accepted' };
    }

    const nextAttempts = attempts + 1;
    const isLocked = nextAttempts >= attemptLimit;
    const nextLockedUntil = isLocked ? now + attemptWindowMs : 0;

    transaction.set(attemptRef, {
      attempts: nextAttempts,
      windowStartedAt: isWindowExpired ? now : windowStartedAt,
      lockedUntil: nextLockedUntil,
    });

    return isLocked
      ? {
          kind: 'locked',
          retryAfterSeconds: Math.ceil(attemptWindowMs / 1000),
        }
      : { kind: 'invalid' };
  });
}

function signPasswordSession(uid: string, expiresAt: number, secret: string): string {
  return createHmac('sha256', secret)
    .update(`${uid}.${expiresAt}`)
    .digest('hex');
}

export function createAdminPasswordSession(
  uid: string,
  sessionSecret: string
): string {
  const expiresAt = Date.now() + adminPasswordSessionDurationSeconds * 1000;
  return `${expiresAt}.${signPasswordSession(uid, expiresAt, sessionSecret)}`;
}

export function isValidAdminPasswordSession(
  uid: string,
  value: string | undefined,
  sessionSecret: string
): boolean {
  if (!value) {
    return false;
  }

  const match = /^(\d{13})\.([a-f0-9]{64})$/.exec(value);
  if (!match) {
    return false;
  }

  const expiresAt = Number(match[1]);
  if (expiresAt <= Date.now()) {
    return false;
  }

  const expectedSignature = Buffer.from(
    signPasswordSession(uid, expiresAt, sessionSecret),
    'hex'
  );
  const actualSignature = Buffer.from(match[2], 'hex');

  return timingSafeEqual(actualSignature, expectedSignature);
}
