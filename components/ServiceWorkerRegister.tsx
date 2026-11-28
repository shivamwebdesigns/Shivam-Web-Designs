'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => {
            if (process.env.NODE_ENV !== 'production') {
              console.log('SW registered with scope:', reg.scope);
            }
          })
          .catch((err) => {
            if (process.env.NODE_ENV !== 'production') {
              console.warn('SW registration failed:', err);
            }
          });
      });
    }

    // Keep internal links inside standalone web app on iOS (prevents launching Safari browser)
    if (
      typeof window !== 'undefined' &&
      ((window.navigator as unknown as { standalone?: boolean }).standalone ||
        window.matchMedia('(display-mode: standalone)').matches)
    ) {
      const handleAnchorClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement | null)?.closest('a');
        if (target && target.href && target.getAttribute('target') !== '_blank') {
          const url = new URL(target.href, window.location.origin);
          if (url.origin === window.location.origin) {
            e.preventDefault();
            window.location.href = target.href;
          }
        }
      };
      document.addEventListener('click', handleAnchorClick, false);
      return () => document.removeEventListener('click', handleAnchorClick, false);
    }
  }, []);

  return null;
}
