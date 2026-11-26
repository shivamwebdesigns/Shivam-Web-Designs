'use client';

import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, CheckCircle, X } from 'lucide-react';

const DISMISS_KEY = 'swd_ios_install_dismissed';

export function IOSInstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Check if dismissed previously
    if (localStorage.getItem(DISMISS_KEY) === 'true') {
      return;
    }

    // Check if device is iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);

    // Check if already in standalone (installed) mode
    const isStandalone =
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      window.matchMedia('(display-mode: standalone)').matches;

    // Show prompt on iOS when not installed
    if (isIOS && !isStandalone) {
      // Gentle delay so user experiences the page first
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DISMISS_KEY, 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="ios-install-title"
      className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-neutral-950/95 backdrop-blur-xl border border-neutral-800 text-white rounded-2xl p-5 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-mono font-bold text-black text-xs">
            SWD
          </div>
          <div>
            <h3 id="ios-install-title" className="text-sm font-semibold text-white leading-tight">
              Add to Home Screen
            </h3>
            <p className="text-xs text-neutral-400">Install SWD for full-screen app experience</p>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-neutral-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss install guide"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2.5 my-3 text-xs text-neutral-300">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-neutral-800 text-white shrink-0">
            <Share className="w-3.5 h-3.5" />
          </div>
          <span>
            1. Tap the <strong className="text-white font-medium">Share</strong> button in Safari toolbar below
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-neutral-800 text-white shrink-0">
            <PlusSquare className="w-3.5 h-3.5" />
          </div>
          <span>
            2. Scroll down and choose <strong className="text-white font-medium">&apos;Add to Home Screen&apos;</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/60">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-neutral-800 text-white shrink-0">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          <span>
            3. Tap <strong className="text-white font-medium">&apos;Add&apos;</strong> in top-right corner
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-neutral-900">
        <button
          onClick={handleDismiss}
          className="w-full py-2 px-4 rounded-lg bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
