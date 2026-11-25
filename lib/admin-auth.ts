import { getFirebaseAdminAuth } from '@/lib/firebase/admin';

type AdminIdentityResult =
  | { kind: 'authorized'; uid: string }
  | { kind: 'unauthorized' }
  | { kind: 'forbidden' }
  | { kind: 'misconfigured' };

export async function verifyAdminIdToken(
  token: string
): Promise<AdminIdentityResult> {
  const adminEmail = process.env.FIREBASE_ADMIN_EMAIL?.trim().toLowerCase();
  if (!adminEmail) {
    return { kind: 'misconfigured' };
  }

  const decodedToken = await getFirebaseAdminAuth()
    .verifyIdToken(token)
    .catch(() => null);

  if (!decodedToken) {
    return { kind: 'unauthorized' };
  }

  if (
    decodedToken.email_verified !== true ||
    decodedToken.email?.toLowerCase() !== adminEmail
  ) {
    return { kind: 'forbidden' };
  }

  if (decodedToken.firebase.sign_in_provider !== 'google.com') {
    return { kind: 'forbidden' };
  }

  return { kind: 'authorized', uid: decodedToken.uid };
}
