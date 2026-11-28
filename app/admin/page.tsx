'use client';

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { useCallback, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  getFirebaseClientAuth,
  isFirebaseClientConfigured,
} from '@/lib/firebase/client';
import {
  Lock,
  LogOut,
  RefreshCw,
  Mail,
  Calendar,
  Building2,
  Sparkles,
  ExternalLink,
  Inbox,
  ArrowLeft,
  DollarSign,
  Clock,
  FileText,
  ShieldCheck,
  Filter,
} from 'lucide-react';

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

const emailStatusBadges: Record<
  InquiryEmailStatus,
  { label: string; dot: string; border: string; bg: string }
> = {
  sent: {
    label: 'Email Delivered',
    dot: 'bg-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10 text-emerald-300',
  },
  pending: {
    label: 'Email Pending',
    dot: 'bg-amber-400 animate-pulse',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10 text-amber-300',
  },
  failed: {
    label: 'Email Failed',
    dot: 'bg-rose-400',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10 text-rose-300',
  },
  not_configured: {
    label: 'Database Saved',
    dot: 'bg-neutral-400',
    border: 'border-neutral-700',
    bg: 'bg-neutral-800/60 text-neutral-400',
  },
};

function formatDate(value: string | null) {
  if (!value) return 'Date unavailable';
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
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'project' | 'contact'>('all');

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

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    if (selectedFilter === 'all') return inquiries;
    return inquiries.filter((inq) => inq.kind === selectedFilter);
  }, [inquiries, selectedFilter]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const projects = inquiries.filter((i) => i.kind === 'project').length;
    const contacts = inquiries.filter((i) => i.kind === 'contact').length;
    return { total, projects, contacts };
  }, [inquiries]);

  const canLoadMore = Boolean(user && nextCursor && !listLoading);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 selection:bg-neutral-800 selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb / Return Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-neutral-400 hover:text-white transition-colors py-1.5 px-3 rounded-lg hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio Website</span>
          </Link>
          <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 hidden sm:inline-block">
            ADMIN // SECURE INQUIRY VAULT
          </span>
        </div>

        {/* Dashboard Header Bar */}
        <header className="bg-neutral-950/80 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Admin Dashboard &amp; Archive
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
              Real-time incoming project briefs, client specifications, and direct contact messages recorded from all channels.
            </p>
          </div>

          {/* User Status / Action Pill */}
          {user && (
            <div className="flex items-center gap-3 bg-black/60 border border-neutral-800/90 rounded-xl p-2 sm:p-2.5 flex-shrink-0 self-start md:self-auto">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-white">
                {user.email ? user.email.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0 pr-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-semibold">
                  Authorized Owner
                </span>
                <span className="text-xs font-medium text-neutral-300 block truncate max-w-[160px] sm:max-w-[200px]">
                  {user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-rose-400 text-xs font-mono font-medium transition-all active:scale-95 shadow-sm"
                title="Sign out of Admin Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          )}
        </header>

        {/* State 1: Firebase Not Configured */}
        {!firebaseConfigured ? (
          <section className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 sm:p-10 text-center space-y-4 max-w-xl mx-auto shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-white">Dashboard Setup Required</h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Firebase credentials are not configured in this environment. Configure your Firebase project environment variables and redeploy to activate the secure admin inquiry vault.
            </p>
          </section>
        ) : authLoading ? (
          /* State 2: Auth Loading */
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-6 h-6 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Verifying credentials…
            </p>
          </div>
        ) : !user ? (
          /* State 3: Owner Login Form */
          <section className="max-w-md mx-auto bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white tracking-tight">Studio Admin Vault</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sign in with the authorized Google administrator account to review client inquiries and active project orders.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 font-mono text-left">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSignIn}
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-white/10"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </section>
        ) : (
          /* State 4: Authenticated Inquiries Vault */
          <div className="space-y-6">

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Total Received</span>
                  <Inbox className="w-4 h-4 text-neutral-500" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {stats.total}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">All recorded entries</span>
              </div>

              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Project Briefs</span>
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400">
                  {stats.projects}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">Package &amp; custom briefs</span>
              </div>

              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-2xl p-5 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[11px] font-mono uppercase tracking-wider">Direct Messages</span>
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {stats.contacts}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">General contact questions</span>
              </div>
            </div>

            {/* Controls Bar: Filters & Refresh Button */}
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Type Filter Buttons */}
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedFilter('all')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    selectedFilter === 'all'
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  All ({stats.total})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('project')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    selectedFilter === 'project'
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Briefs ({stats.projects})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('contact')}
                  className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    selectedFilter === 'contact'
                      ? 'bg-white text-black shadow-sm'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  Messages ({stats.contacts})
                </button>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => void loadInquiries(user)}
                disabled={listLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono font-semibold text-neutral-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${listLoading ? 'animate-spin text-white' : ''}`} />
                <span>{listLoading ? 'Updating…' : 'Refresh Inquiries'}</span>
              </button>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-xs sm:text-sm text-rose-300 font-mono">
                {error}
              </div>
            )}

            {/* Inquiries Empty State */}
            {filteredInquiries.length === 0 && !listLoading && !error ? (
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <Inbox className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">No inquiries found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  {selectedFilter === 'all'
                    ? 'Submissions from start-project and contact forms will appear here in real time.'
                    : `No inquiries match the "${selectedFilter}" filter right now.`}
                </p>
              </div>
            ) : (
              /* Inquiries Cards Grid */
              <div className="space-y-4">
                {filteredInquiries.map((inquiry) => {
                  const statusMeta = emailStatusBadges[inquiry.emailStatus] ?? emailStatusBadges.not_configured;

                  return (
                    <article
                      key={inquiry.id}
                      className="bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700/80 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-xl space-y-4"
                    >
                      {/* Card Top Meta Row */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-800/80">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Kind Badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${
                              inquiry.kind === 'project'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            }`}
                          >
                            {inquiry.kind === 'project' ? (
                              <Sparkles className="w-3 h-3" />
                            ) : (
                              <Mail className="w-3 h-3" />
                            )}
                            <span>{inquiry.kind === 'project' ? 'Project Brief' : 'Contact Message'}</span>
                          </span>

                          {/* Email Status Pill */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider border ${statusMeta.bg} ${statusMeta.border}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusMeta.dot}`} />
                            <span>{statusMeta.label}</span>
                          </span>
                        </div>

                        {/* Date & Ref */}
                        <div className="flex items-center gap-3 text-neutral-400 text-xs font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </span>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-500">
                            #{inquiry.id.slice(-6)}
                          </span>
                        </div>
                      </div>

                      {/* Client Header Info */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h2 className="text-lg font-bold text-white tracking-tight">
                            {inquiry.name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-3 text-xs">
                            <a
                              href={`mailto:${inquiry.email}`}
                              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors underline underline-offset-4 font-mono"
                            >
                              <Mail className="w-3.5 h-3.5 text-neutral-500" />
                              <span>{inquiry.email}</span>
                            </a>
                            {inquiry.company && (
                              <span className="inline-flex items-center gap-1.5 text-neutral-400">
                                <Building2 className="w-3.5 h-3.5 text-neutral-500" />
                                <span>{inquiry.company}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Direct Action Link */}
                        <a
                          href={`mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(
                            inquiry.subject || 'Your Inquiry to ShivamWebDesigns'
                          )}`}
                          className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-200 hover:text-white transition-colors self-start active:scale-95"
                        >
                          <span>Reply to Client</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Project Specific Breakdown */}
                      {inquiry.kind === 'project' ? (
                        <div className="space-y-3 pt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                            <div className="bg-black/50 border border-neutral-800/80 rounded-xl p-3">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                                Service Type
                              </span>
                              <span className="text-xs font-semibold text-white block">
                                {inquiry.projectType || 'Custom Project'}
                              </span>
                            </div>

                            <div className="bg-black/50 border border-neutral-800/80 rounded-xl p-3">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                                Target Budget
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-400 block">
                                {inquiry.budget || 'Not specified'}
                              </span>
                            </div>

                            <div className="bg-black/50 border border-neutral-800/80 rounded-xl p-3">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                                Delivery Timeline
                              </span>
                              <span className="text-xs font-semibold text-white block">
                                {inquiry.timeline || 'Flexible'}
                              </span>
                            </div>
                          </div>

                          {inquiry.description && (
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-3.5 space-y-1">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                                Project Scope &amp; Brief
                              </span>
                              <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-wrap">
                                {inquiry.description}
                              </p>
                            </div>
                          )}

                          {inquiry.referenceUrl && (
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                              <span className="text-[10px] uppercase tracking-wider text-neutral-500">
                                Reference URL:
                              </span>
                              <a
                                href={inquiry.referenceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline truncate max-w-sm inline-flex items-center gap-1"
                              >
                                <span>{inquiry.referenceUrl}</span>
                                <ExternalLink className="w-3 h-3 flex-shrink-0" />
                              </a>
                            </div>
                          )}

                          {inquiry.additionalRequirements && (
                            <div className="text-xs text-neutral-400 bg-neutral-900/40 border border-neutral-800/40 rounded-xl p-3">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                                Additional Notes
                              </span>
                              <p className="whitespace-pre-wrap">{inquiry.additionalRequirements}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Contact Specific Message */
                        <div className="space-y-3 pt-2">
                          {inquiry.subject && (
                            <div className="text-xs">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-0.5">
                                Subject
                              </span>
                              <span className="font-semibold text-white text-sm">{inquiry.subject}</span>
                            </div>
                          )}
                          <div className="bg-black/50 border border-neutral-800/80 rounded-xl p-4">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-1.5">
                              Message Body
                            </span>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                              {inquiry.message}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}

            {/* Load More Trigger */}
            {canLoadMore && (
              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => void loadInquiries(user, nextCursor ?? undefined, true)}
                  disabled={listLoading}
                  className="min-h-[46px] px-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all active:scale-95 shadow-md"
                >
                  {listLoading ? 'Loading next page…' : 'Load More Inquiries'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
