'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  XCircle,
  MessageSquare,
  Home,
  RotateCcw,
  ExternalLink,
  X,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

/**
 * Locks background page scroll while `locked` is true.
 * The page stays visible; only elements with their own overflow-y-auto scroll.
 */
function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const prev = {
      htmlOverflow: html.style.overflow,
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.paddingRight = prev.paddingRight;
      window.scrollTo({ top: scrollY, behavior: 'instant' as ScrollBehavior });
    };
  }, [locked]);
}

export interface OrderStatusModalProps {
  isOpen: boolean;
  status: 'loading' | 'success' | 'cancelled';
  waUrl: string;
  onClose: () => void;
  onBuyAgain: () => void;
  onCancelOrder: () => void;
  onResumeCart: () => void;
}

export function OrderStatusModal({
  isOpen,
  status,
  waUrl,
  onClose,
  onBuyAgain,
  onCancelOrder,
  onResumeCart,
}: OrderStatusModalProps) {
  const router = useRouter();

  // Lock background scroll while the modal is open
  useScrollLock(isOpen);

  // Close on Escape key (only when not in the loading state)
  useEffect(() => {
    if (!isOpen || status === 'loading') return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const handleGoHome = () => {
    onClose();
    router.push('/?order=success');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Order Status"
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto overscroll-contain bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black text-center"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Close button for non-loading state */}
        {status !== 'loading' && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* ================= LOADING STATE ================= */}
        {status === 'loading' && (
          <div className="py-8 space-y-6 flex flex-col items-center">
            {/* Smooth Circling Status Spinner */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-neutral-800 border-t-white animate-spin" />
              <div className="absolute w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Reviewing Your Order…
              </h3>
              <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Preparing your package configuration and opening WhatsApp for direct founder kickoff.
              </p>
            </div>

            <button
              type="button"
              onClick={onCancelOrder}
              className="text-xs font-mono text-neutral-400 hover:text-white transition-colors underline pt-2"
            >
              Cancel request
            </button>
          </div>
        )}

        {/* ================= SUCCESS STATE ================= */}
        {status === 'success' && (
          <div className="space-y-6 pt-2">
            {/* Animated Tick Symbol with Spring Bounce */}
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl shadow-emerald-950/50">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Your Order was Placed Successfully
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto">
                Thank you for choosing ShivamWebDesigns! Wait for 24–48 hours, we&apos;ll be reaching out soon.
              </p>
            </div>

            {/* 24-48 Hours Contact Commitment Card */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-white font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Next Step: 24–48 Hours Review</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                We will review your requirements and contact you within <strong>24–48 hours</strong> to confirm scope, milestones, and start the kickoff process.
              </p>
            </div>

            {/* Direct WhatsApp Contact Button (Bypasses popup blocker) */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 active:scale-98 transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Send Message on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Social Media Links as Buttons */}
            <div className="space-y-2 pt-1 border-t border-neutral-900">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                Connect Directly Across Our Channels
              </span>
              <div className="flex items-center justify-center gap-2">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Footer Navigation Buttons: Buy Again & Go to Home */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-neutral-900">
              <button
                type="button"
                onClick={onBuyAgain}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-neutral-800 bg-neutral-900/80 hover:bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Buy Again</span>
              </button>

              <button
                type="button"
                onClick={handleGoHome}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md shadow-white/10"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Home</span>
              </button>
            </div>

            <div>
              <button
                type="button"
                onClick={onCancelOrder}
                className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
              >
                Cancel or discard this order
              </button>
            </div>
          </div>
        )}

        {/* ================= CANCELLED STATE ================= */}
        {status === 'cancelled' && (
          <div className="space-y-6 pt-2">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center mx-auto">
              <XCircle className="w-9 h-9 text-neutral-400" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                Order Dismissed
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Order Cancelled
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Your order was cancelled and no commitment was made. Your selected items remain saved as an active draft in your browser.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 text-xs text-neutral-400">
              You can reopen your cart to adjust packages, edit add-ons, or proceed whenever you are ready.
            </div>

            {/* Actions for Cancelled State */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={onResumeCart}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono text-white transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Resume Cart</span>
              </button>

              <button
                type="button"
                onClick={handleGoHome}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go to Home</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}