import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { getFirebaseAdminDb } from '@/lib/firebase/admin';

export const adminPinCookieName = 'swd_admin_pin_session';
export const adminPinSessionDurationSeconds = 30 * 60;

const attemptWindowMs = 15 * 60 * 1000;
const attemptLimit = 5;

interface AdminPinConfig {
  pin: string;
  sessionSecret: string;
}

type PinAttemptResult =
  | { kind: 'accepted' }
  | { kind: 'invalid' }
  | { kind: 'locked'; retryAfterSeconds: number };

export function getAdminPinConfig(): AdminPinConfig {
  const pin = process.env.ADMIN_PIN?.trim();
  const sessionSecret = process.env.ADMIN_PIN_SESSION_SECRET?.trim();

  if (
    !pin ||
    !/^\d{4}$/.test(pin) ||
    !sessionSecret ||
    Buffer.byteLength(sessionSecret) < 32
  ) {
    const error = new Error('Admin PIN configuration is invalid.');
    error.name = 'AdminPinConfigurationError';
    throw error;
  }

  return { pin, sessionSecret };
}

export async function checkAdminPin(
  uid: string,
  submittedPin: string,
  expectedPin: string
): Promise<PinAttemptResult> {
  const pinMatches = timingSafeEqual(
    Buffer.from(submittedPin, 'ascii'),
    Buffer.from(expectedPin, 'ascii')
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

    if (pinMatches) {
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

function signPinSession(uid: string, expiresAt: number, secret: string): string {
  return createHmac('sha256', secret)
    .update(`${uid}.${expiresAt}`)
    .digest('hex');
}

export function createAdminPinSession(
  uid: string,
  sessionSecret: string
): string {
  const expiresAt = Date.now() + adminPinSessionDurationSeconds * 1000;
  return `${expiresAt}.${signPinSession(uid, expiresAt, sessionSecret)}`;
}

export function isValidAdminPinSession(
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
    signPinSession(uid, expiresAt, sessionSecret),
    'hex'
  );
  const actualSignature = Buffer.from(match[2], 'hex');

  return timingSafeEqual(actualSignature, expectedSignature);
}
