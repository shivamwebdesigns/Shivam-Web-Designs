const CACHE_NAME = 'swd-cache-v2';
const PRECACHE_ASSETS = [
  '/',
  '/packages',
  '/site.webmanifest',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/assets/logo-trimmed.png',
  '/assets/favicon-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn('SW precache notice:', err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) {
    return;
  }

  // Static assets: cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg')
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Navigation pages: network-first with cached and offline fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const fallback = await caches.match('/');
          if (fallback) return fallback;
          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <title>Offline | ShivamWebDesigns</title>
              <style>
                body { background: #000; color: #fff; font-family: -apple-system, BlinkMacSystemFont, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 20px; }
                .box { max-width: 420px; border: 1px solid #262626; padding: 36px 28px; border-radius: 16px; background: #0a0a0a; }
                h1 { font-size: 22px; font-weight: 600; margin: 0 0 10px; }
                p { color: #888; font-size: 14px; line-height: 1.5; margin: 0 0 20px; }
                a { display: inline-block; background: #fff; color: #000; padding: 10px 20px; border-radius: 999px; text-decoration: none; font-size: 13px; font-weight: 600; }
              </style>
            </head>
            <body>
              <div class="box">
                <h1>You are currently offline</h1>
                <p>ShivamWebDesigns is saved on your device, but this page requires an active connection.</p>
                <a href="/">Go to Home</a>
              </div>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
  }
});
