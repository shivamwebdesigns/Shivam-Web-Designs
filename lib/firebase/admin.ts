import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const adminAppName = 'shivamwebdesigns-inquiries';

export function getFirebaseAdminConfigStatus() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim() ?? '';

  return {
    projectIdConfigured: Boolean(process.env.FIREBASE_PROJECT_ID?.trim()),
    clientEmailConfigured: Boolean(process.env.FIREBASE_CLIENT_EMAIL?.trim()),
    privateKeyConfigured: Boolean(privateKey),
    privateKeyHasPemMarkers:
      privateKey.startsWith('-----BEGIN PRIVATE KEY-----') &&
      privateKey.endsWith('-----END PRIVATE KEY-----'),
    adminEmailConfigured: Boolean(process.env.FIREBASE_ADMIN_EMAIL?.trim()),
  };
}

export function getFirebaseErrorCode(error: unknown): string | number | undefined {
  if (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (typeof error.code === 'string' || typeof error.code === 'number')
  ) {
    return error.code;
  }

  return undefined;
}

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!projectId || !clientEmail || !privateKey) {
    const missing = [
      !projectId && 'FIREBASE_PROJECT_ID',
      !clientEmail && 'FIREBASE_CLIENT_EMAIL',
      !privateKey && 'FIREBASE_PRIVATE_KEY',
    ].filter(Boolean);
    const error = new Error(
      `Missing Firebase Admin configuration: ${missing.join(', ')}`
    );
    error.name = 'FirebaseAdminConfigurationError';
    throw error;
  }

  const existingApp = getApps().find((app) => app.name === adminAppName);
  if (existingApp) {
    return existingApp;
  }

  return initializeApp(
    {
      credential: cert({ projectId, clientEmail, privateKey }),
      projectId,
    },
    adminAppName
  );
}

export function getFirebaseAdminAuth() {
  return getAuth(getAdminApp());
}

export function getFirebaseAdminDb() {
  return getFirestore(getAdminApp());
}

export { FieldValue };
