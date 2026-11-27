'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, X, ShoppingCart, Sparkles } from 'lucide-react';

export function OrderSuccessToast() {
  const [toastType, setToastType] = useState<'success' | 'cancel' | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const params = new URLSearchParams(window.location.search);
      const orderParam = params.get('order');

      if (orderParam === 'success') {
        setToastType('success');
        // Clean query parameter without page reload
        window.history.replaceState({}, '', window.location.pathname);
      } else if (orderParam === 'cancel' || orderParam === 'cancelled') {
        setToastType('cancel');
        // Clean query parameter without page reload
        window.history.replaceState({}, '', window.location.pathname);
      }
    } catch (_) {}
  }, []);

  if (!toastType) return null;

  const isSuccess = toastType === 'success';

  return (
    <aside
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-lg backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
        isSuccess
          ? 'bg-emerald-950/95 border border-emerald-500/70 text-white shadow-emerald-950/80'
          : 'bg-rose-950/95 border border-rose-500/70 text-white shadow-rose-950/80'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Status Icon */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
            isSuccess
              ? 'bg-emerald-900/90 border border-emerald-400/50 text-emerald-300'
              : 'bg-rose-900/90 border border-rose-400/50 text-rose-300'
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-300 animate-pulse" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-300" />
          )}
        </div>

        {/* Text & Message */}
        <div className="flex-1 space-y-1 text-left">
          <p
            className={`text-xs font-mono font-bold uppercase tracking-wider ${
              isSuccess ? 'text-emerald-300' : 'text-rose-300'
            }`}
          >
            {isSuccess ? 'Order Placed Successfully' : 'Order Cancelled Successfully'}
          </p>

          <p className="text-xs sm:text-sm text-neutral-200 leading-snug">
            {isSuccess
              ? "Your order was placed successfully! Wait for 24–48 hours, we'll be reaching out soon."
              : 'Your order was cancelled successfully. Your selected items remain saved in your cart.'}
          </p>

          {/* Action Button */}
          <div className="pt-2 flex items-center gap-2">
            {isSuccess ? (
              <Link
                href="/packages"
                onClick={() => setToastType(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>Buy Again</span>
              </Link>
            ) : (
              <Link
                href="/packages#cart"
                onClick={() => setToastType(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md active:scale-95"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-black" />
                <span>See Your Cart</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setToastType(null)}
              className="text-xs font-mono text-neutral-400 hover:text-white px-2 py-1 transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setToastType(null)}
          className="w-7 h-7 rounded-full border border-neutral-700/80 hover:border-white flex items-center justify-center text-neutral-400 hover:text-white transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}

