'use client';

import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const clientAppName = 'shivamwebdesigns-dashboard';

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseClientConfigured() {
  return Object.values(clientConfig).every(
    (value) => typeof value === 'string' && value.trim().length > 0
  );
}

export function getFirebaseClientAuth() {
  if (!isFirebaseClientConfigured()) {
    throw new Error('Firebase sign-in is not configured.');
  }

  const existingApp = getApps().find((app) => app.name === clientAppName);
  const app = existingApp ?? initializeApp(clientConfig, clientAppName);
  return getAuth(app);
}
