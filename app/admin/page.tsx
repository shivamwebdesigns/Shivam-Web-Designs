'use client';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import {
  getFirebaseClientAuth,
  isFirebaseClientConfigured,
} from '@/lib/firebase/client';

type InquiryEmailStatus = 'pending' | 'sent' | 'not_configured' | 'failed';

interface Inquiry {
  id: string;
  kind: 'project' | 'contact';
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  referenceUrl: string;
  additionalRequirements: string;
  subject: string;
  message: string;
  emailStatus: InquiryEmailStatus;
  createdAt: string | null;
}

interface InquiryPage {
  inquiries: Inquiry[];
  nextCursor: string | null;
}

const emailStatusLabels: Record<InquiryEmailStatus, string> = {
  pending: 'Email status pending',
  sent: 'Email sent',
  not_configured: 'Email not configured',
  failed: 'Email failed',
};

function formatDate(value: string | null) {
  if (!value) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function AdminPage() {
  const firebaseConfigured = isFirebaseClientConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState('');

  const loadInquiries = useCallback(
    async (activeUser: User, cursor?: string, append = false) => {
      setListLoading(true);
      setError('');

      try {
        const token = await activeUser.getIdToken();
        const query = cursor ? `?cursor=${encodeURIComponent(cursor)}` : '';
        const response = await fetch(`/api/admin/inquiries${query}`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: 'no-store',
        });
        const result = (await response.json()) as InquiryPage & { error?: string };

        if (!response.ok) {
          if (response.status === 401) {
            setInquiries([]);
            setNextCursor(null);
          }
          throw new Error(result.error || 'Unable to load inquiries.');
        }

        if (!Array.isArray(result.inquiries)) {
          throw new Error('The dashboard returned an unexpected response.');
        }

        setInquiries((current) =>
          append ? [...current, ...result.inquiries] : result.inquiries
        );
        setNextCursor(result.nextCursor ?? null);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Unable to load inquiries. Please try again.'
        );
      } finally {
        setListLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!firebaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChanged(
        getFirebaseClientAuth(),
        (activeUser) => {
          setUser(activeUser);
          setAuthLoading(false);
          setInquiries([]);
          setNextCursor(null);
          setError('');
        },
        () => {
          setAuthLoading(false);
          setError('Could not verify the current Google sign-in.');
        }
      );
    } catch {
      setAuthLoading(false);
      setError('Firebase sign-in could not be initialized.');
    }

    return () => unsubscribe?.();
  }, [firebaseConfigured]);

  useEffect(() => {
    if (user) {
      void loadInquiries(user);
    }
  }, [loadInquiries, user]);

  async function handleSignIn() {
    setError('');
    const auth = getFirebaseClientAuth();
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch {
      setError('Google sign-in did not complete. Please try again.');
    }
  }

  async function handleSignOut() {
    setError('');
    try {
      await signOut(getFirebaseClientAuth());
    } catch {
      setError('Could not lock and sign out. Please try again.');
    }
  }

  const canLoadMore = Boolean(user && nextCursor && !listLoading);

  return (
    <main className="min-h-screen bg-black px-5 py-12 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 flex flex-col gap-8 border-b border-neutral-800 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-light tracking-tight sm:text-5xl">
              Inquiry Archive
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-400">
              Project briefs and contact messages saved for studio review.
            </p>
          </div>
          {user && (
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="break-all text-sm text-neutral-400">{user.email}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="min-h-11 border border-neutral-700 px-4 text-xs font-mono uppercase tracking-wider text-neutral-300 transition-colors hover:border-white hover:text-white"
              >
                Sign out
              </button>
            </div>
          )}
        </header>

        {!firebaseConfigured ? (
          <section className="border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
            <h2 className="text-xl font-light">Dashboard setup required</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-400">
              Firebase sign-in is not configured for this deployment. Add the
              Firebase web app settings to the deployment environment, enable
              Google sign-in in Firebase Authentication, then redeploy.
            </p>
          </section>
        ) : authLoading ? (
          <p className="py-10 text-sm text-neutral-400" role="status">
            Checking sign-in…
          </p>
        ) : !user ? (
          <section className="max-w-xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
            <h2 className="text-xl font-light">Owner sign-in</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-400">
              Sign in with the authorized Google account to view inquiries.
            </p>
            {error && (
              <p className="mt-4 text-sm text-red-300" role="alert">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleSignIn}
              className="mt-6 min-h-12 border border-white bg-white px-5 text-xs font-mono uppercase tracking-wider text-black transition-colors hover:bg-neutral-200"
            >
              Continue with Google
            </button>
          </section>
        ) : (
          <section aria-label="Saved inquiries">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-neutral-400" aria-live="polite">
                {inquiries.length} {inquiries.length === 1 ? 'inquiry' : 'inquiries'} loaded
              </p>
              <button
                type="button"
                onClick={() => void loadInquiries(user)}
                disabled={listLoading}
                className="min-h-11 border border-neutral-700 px-4 text-xs font-mono uppercase tracking-wider text-neutral-300 transition-colors hover:border-white hover:text-white disabled:cursor-wait disabled:opacity-50"
              >
                {listLoading ? 'Loading…' : 'Refresh'}
              </button>
            </div>

            {error && (
              <div
                className="mb-6 border border-red-900/70 bg-red-950/30 p-4 text-sm text-red-200"
                role="alert"
              >
                {error}
              </div>
            )}

            {inquiries.length === 0 && !listLoading && !error ? (
              <div className="border border-neutral-800 bg-neutral-950 p-8 text-center">
                <h2 className="text-lg font-light">No inquiries saved yet</h2>
                <p className="mt-2 text-sm text-neutral-400">
                  New project and contact form submissions will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <article
                    key={inquiry.id}
                    className="border border-neutral-800 bg-neutral-950 p-5 sm:p-7"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-wider text-white">
                          {inquiry.kind === 'project' ? 'Project brief' : 'Contact message'}
                        </span>
                        <span className="border border-neutral-700 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                          {emailStatusLabels[inquiry.emailStatus] ?? 'Email status unknown'}
                        </span>
                      </div>
                      <time
                        className="text-xs text-neutral-400"
                        dateTime={inquiry.createdAt ?? undefined}
                      >
                        {formatDate(inquiry.createdAt)}
                      </time>
                    </div>

                    <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_auto]">
                      <div>
                        <h2 className="text-xl font-light">{inquiry.name}</h2>
                        <a
                          className="mt-1 inline-block break-all text-sm text-neutral-400 underline underline-offset-4 hover:text-white"
                          href={`mailto:${inquiry.email}`}
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                        Ref: {inquiry.id}
                      </p>
                    </div>

                    {inquiry.kind === 'project' ? (
                      <div className="mt-5 grid gap-4 border-t border-neutral-800 pt-5 sm:grid-cols-2">
                        {inquiry.company && (
                          <Info label="Company" value={inquiry.company} />
                        )}
                        <Info label="Service" value={inquiry.projectType} />
                        <Info label="Budget" value={inquiry.budget} />
                        <Info label="Timeline" value={inquiry.timeline} />
                        <div className="sm:col-span-2">
                          <Info label="Project description" value={inquiry.description} />
                        </div>
                        {inquiry.referenceUrl && (
                          <div>
                            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                              Reference
                            </p>
                            <a
                              className="break-all text-sm text-neutral-300 underline underline-offset-4 hover:text-white"
                              href={inquiry.referenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {inquiry.referenceUrl}
                            </a>
                          </div>
                        )}
                        {inquiry.additionalRequirements && (
                          <div className="sm:col-span-2">
                            <Info
                              label="Additional notes"
                              value={inquiry.additionalRequirements}
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-5 border-t border-neutral-800 pt-5">
                        {inquiry.subject && <Info label="Subject" value={inquiry.subject} />}
                        <div className="mt-4">
                          <Info label="Message" value={inquiry.message} />
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}

            {canLoadMore && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => void loadInquiries(user, nextCursor ?? undefined, true)}
                  className="min-h-12 border border-neutral-700 px-6 text-xs font-mono uppercase tracking-wider text-neutral-300 transition-colors hover:border-white hover:text-white"
                >
                  Load more
                </button>
              </div>
            )}
          </section>
        )}

        {error && (!user || authLoading || !firebaseConfigured) && (
          <p className="mt-6 text-sm text-red-300" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
        {label}
      </p>
      <p className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-300">
        {value}
      </p>
    </div>
  );
}