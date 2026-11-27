'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export function OrderSuccessToast() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('order') === 'success') {
      setShowToast(true);

      // Clean the query parameter from URL without page reload
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);

      // Auto-dismiss after 7 seconds
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!showToast) return null;

  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] sm:w-auto bg-neutral-950/95 backdrop-blur-md border border-emerald-500/50 rounded-2xl p-4 shadow-2xl shadow-black animate-fade-in flex items-center justify-between gap-4 text-left"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Order Recorded Successfully
          </p>
          <p className="text-xs text-neutral-300">
            Thanks for buying! We will contact you within <strong>24–48 hours</strong>.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowToast(false)}
        className="w-7 h-7 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors flex-shrink-0"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
