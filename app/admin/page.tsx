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
  ShieldCheck,
  CheckCircle2,
  Check,
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
  isDone?: boolean;
  completedAt?: string | null;
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
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'project' | 'contact'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all');

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

        // Overlay with client-side cache for instant persistence
        let doneMap: Record<string, boolean> = {};
        try {
          doneMap = JSON.parse(localStorage.getItem('swd-admin-done-ids') || '{}');
        } catch (_) {}

        const mapped = result.inquiries.map((inq) => ({
          ...inq,
          isDone: Boolean(inq.isDone || doneMap[inq.id]),
        }));

        setInquiries((current) => (append ? [...current, ...mapped] : mapped));
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

  // Toggle done status for an inquiry
  async function toggleInquiryDone(inquiry: Inquiry) {
    if (!user || updatingId) return;
    const nextState = !inquiry.isDone;
    setUpdatingId(inquiry.id);

    // Optimistic UI update
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === inquiry.id
          ? {
              ...item,
              isDone: nextState,
              completedAt: nextState ? new Date().toISOString() : null,
            }
          : item
      )
    );

    // Cache to localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('swd-admin-done-ids') || '{}');
      if (nextState) stored[inquiry.id] = true;
      else delete stored[inquiry.id];
      localStorage.setItem('swd-admin-done-ids', JSON.stringify(stored));
    } catch (_) {}

    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: inquiry.id, isDone: nextState }),
      });
      if (!res.ok) {
        throw new Error('Failed to save status on server.');
      }
    } catch (err) {
      // Revert if request failed
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === inquiry.id
            ? { ...item, isDone: inquiry.isDone, completedAt: inquiry.completedAt }
            : item
        )
      );
      setError('Could not update inquiry status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  }

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      // Type filter
      if (selectedFilter !== 'all' && inq.kind !== selectedFilter) return false;
      // Status filter
      if (statusFilter === 'active' && inq.isDone) return false;
      if (statusFilter === 'done' && !inq.isDone) return false;
      return true;
    });
  }, [inquiries, selectedFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = inquiries.length;
    const projects = inquiries.filter((i) => i.kind === 'project').length;
    const contacts = inquiries.filter((i) => i.kind === 'contact').length;
    const completed = inquiries.filter((i) => i.isDone).length;
    const active = total - completed;
    return { total, projects, contacts, completed, active };
  }, [inquiries]);

  const canLoadMore = Boolean(user && nextCursor && !listLoading);

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 selection:bg-neutral-800 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-5 sm:space-y-6">
        
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
        <header className="bg-neutral-950/80 border border-neutral-800/90 rounded-2xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                Admin Dashboard &amp; Archive
              </h1>
            </div>
            <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
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
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-semibold leading-tight">
                  Authorized Owner
                </span>
                <span className="text-xs font-medium text-neutral-300 block truncate max-w-[150px] sm:max-w-[200px]">
                  {user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-rose-400 text-xs font-mono font-medium transition-all active:scale-95 shadow-sm"
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
          <section className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 text-center space-y-3.5 max-w-lg mx-auto shadow-2xl">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">Dashboard Setup Required</h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Firebase credentials are not configured in this environment. Configure your Firebase project environment variables and redeploy to activate the secure admin inquiry vault.
            </p>
          </section>
        ) : authLoading ? (
          /* State 2: Auth Loading */
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <div className="w-6 h-6 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
            <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Verifying credentials…
            </p>
          </div>
        ) : !user ? (
          /* State 3: Owner Login Form */
          <section className="max-w-md mx-auto bg-neutral-950/90 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-2xl backdrop-blur-xl">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-lg font-bold text-white tracking-tight">Studio Admin Vault</h2>
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
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-100 text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all active:scale-95 shadow-lg shadow-white/10"
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
          <div className="space-y-5">

            {/* Quick Metrics Bar: 4 Columns with Done Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 sm:p-4 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Total</span>
                  <Inbox className="w-3.5 h-3.5 text-neutral-500" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">
                  {stats.total}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">All recorded</span>
              </div>

              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 sm:p-4 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Briefs</span>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">
                  {stats.projects}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">Package orders</span>
              </div>

              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 sm:p-4 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Messages</span>
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white">
                  {stats.contacts}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">Contact inquiries</span>
              </div>

              <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 sm:p-4 space-y-1">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-[10px] font-mono uppercase tracking-wider">Completed</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-400">
                  {stats.completed}
                </div>
                <span className="text-[10px] font-mono text-neutral-500 block">{stats.active} remaining active</span>
              </div>
            </div>

            {/* Controls Bar: Dual Filters & Refresh Button */}
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Filter Clusters */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Status Filter */}
                <div className="inline-flex rounded-lg bg-neutral-900 border border-neutral-800 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      statusFilter === 'all' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    All ({stats.total})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('active')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      statusFilter === 'active' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Active ({stats.active})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('done')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      statusFilter === 'done' ? 'bg-emerald-400 text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Done ({stats.completed})
                  </button>
                </div>

                {/* Type Filter */}
                <div className="inline-flex rounded-lg bg-neutral-900 border border-neutral-800 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      selectedFilter === 'all' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('project')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      selectedFilter === 'project' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Briefs
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedFilter('contact')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      selectedFilter === 'contact' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Messages
                  </button>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => void loadInquiries(user)}
                disabled={listLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono font-medium text-neutral-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${listLoading ? 'animate-spin text-white' : ''}`} />
                <span>{listLoading ? 'Updating…' : 'Refresh'}</span>
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 font-mono">
                {error}
              </div>
            )}

            {/* Inquiries Empty State */}
            {filteredInquiries.length === 0 && !listLoading && !error ? (
              <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-2xl p-10 text-center space-y-2.5">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-500">
                  <Inbox className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">No inquiries found</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  {statusFilter === 'done'
                    ? 'No inquiries are marked as done yet. Click the "Done" button on any card to complete it.'
                    : selectedFilter === 'all'
                    ? 'Submissions from start-project and contact forms will appear here in real time.'
                    : `No inquiries match the current filters.`}
                </p>
              </div>
            ) : (
              /* Inquiries Cards Stack */
              <div className="space-y-3.5">
                {filteredInquiries.map((inquiry) => {
                  const statusMeta = emailStatusBadges[inquiry.emailStatus] ?? emailStatusBadges.not_configured;

                  return (
                    <article
                      key={inquiry.id}
                      className={`border rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-xl space-y-3.5 ${
                        inquiry.isDone
                          ? 'bg-neutral-950/90 border-emerald-500/30'
                          : 'bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700/80'
                      }`}
                    >
                      {/* Card Top Meta Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-neutral-800/80">
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Kind Badge */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider ${
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

                          {/* Completed / Done Badge */}
                          {inquiry.isDone && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Done</span>
                            </span>
                          )}
                        </div>

                        {/* Date & Ref */}
                        <div className="flex items-center gap-2.5 text-neutral-400 text-xs font-mono">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{formatDate(inquiry.createdAt)}</span>
                          </span>
                          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-500">
                            #{inquiry.id.slice(-6)}
                          </span>
                        </div>
                      </div>

                      {/* Client Header Info & Action Cluster */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                            <span>{inquiry.name}</span>
                            {inquiry.isDone && (
                              <span className="text-xs font-mono text-emerald-400 font-normal">
                                (Completed)
                              </span>
                            )}
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

                        {/* Action Cluster: Done Button & Reply */}
                        <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
                          {/* Done / Complete Button */}
                          <button
                            type="button"
                            onClick={() => void toggleInquiryDone(inquiry)}
                            disabled={updatingId === inquiry.id}
                            className={`inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-mono font-semibold transition-all duration-200 active:scale-95 border ${
                              inquiry.isDone
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800'
                            }`}
                            title={
                              inquiry.isDone
                                ? 'Click to mark as Active / Incomplete'
                                : 'Click to mark as Completed / Done'
                            }
                          >
                            {updatingId === inquiry.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-emerald-400/40 border-t-emerald-400 rounded-full animate-spin" />
                            ) : inquiry.isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Check className="w-3.5 h-3.5 text-neutral-400" />
                            )}
                            <span>{inquiry.isDone ? 'Completed' : 'Mark Done'}</span>
                          </button>

                          {/* Direct Action Link */}
                          <a
                            href={`mailto:${inquiry.email}?subject=Re:%20${encodeURIComponent(
                              inquiry.subject || 'Your Inquiry to ShivamWebDesigns'
                            )}`}
                            className="inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors active:scale-95"
                          >
                            <span>Reply</span>
                            <ExternalLink className="w-3 h-3 text-neutral-400" />
                          </a>
                        </div>
                      </div>

                      {/* Project Specific Breakdown */}
                      {inquiry.kind === 'project' ? (
                        <div className="space-y-2.5 pt-1">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <div className="bg-black/50 border border-neutral-800/80 rounded-lg p-2.5">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">
                                Service Type
                              </span>
                              <span className="text-xs font-semibold text-white block truncate">
                                {inquiry.projectType || 'Custom Project'}
                              </span>
                            </div>

                            <div className="bg-black/50 border border-neutral-800/80 rounded-lg p-2.5">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">
                                Target Budget
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-400 block truncate">
                                {inquiry.budget || 'Not specified'}
                              </span>
                            </div>

                            <div className="bg-black/50 border border-neutral-800/80 rounded-lg p-2.5">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">
                                Delivery Timeline
                              </span>
                              <span className="text-xs font-semibold text-white block truncate">
                                {inquiry.timeline || 'Flexible'}
                              </span>
                            </div>
                          </div>

                          {inquiry.description && (
                            <div className="bg-black/40 border border-neutral-800/60 rounded-xl p-3 space-y-1">
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
                            <div className="text-xs text-neutral-400 bg-neutral-900/40 border border-neutral-800/40 rounded-xl p-2.5">
                              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-0.5">
                                Additional Notes
                              </span>
                              <p className="whitespace-pre-wrap">{inquiry.additionalRequirements}</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* Contact Specific Message */
                        <div className="space-y-2.5 pt-1">
                          {inquiry.subject && (
                            <div className="text-xs">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-0.5">
                                Subject
                              </span>
                              <span className="font-semibold text-white text-sm">{inquiry.subject}</span>
                            </div>
                          )}
                          <div className="bg-black/50 border border-neutral-800/80 rounded-xl p-3 sm:p-3.5">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block mb-1">
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
              <div className="pt-3 text-center">
                <button
                  type="button"
                  onClick={() => void loadInquiries(user, nextCursor ?? undefined, true)}
                  disabled={listLoading}
                  className="min-h-[44px] px-7 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-mono font-bold uppercase tracking-wider text-white transition-all active:scale-95 shadow-md"
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
