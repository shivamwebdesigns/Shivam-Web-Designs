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
  }, []);

  return null;
}
