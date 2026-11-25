import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';

const adminAppName = 'shivamwebdesigns-inquiries';

function getAdminApp() {
  const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n').trim();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Firebase Admin credentials are not configured.');
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
