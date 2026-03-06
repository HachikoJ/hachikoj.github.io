self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    const clients = await self.clients.matchAll({ type: 'window' });
    for (const client of clients) {
      client.postMessage({ command: 'FORCE_REFRESH' });
    }
    await self.registration.unregister();
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', () => {});
