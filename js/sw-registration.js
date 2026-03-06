if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });

  if (window.caches) {
    caches.keys().then((keys) => {
      keys.forEach((key) => caches.delete(key));
    });
  }

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.command === 'FORCE_REFRESH') {
      window.location.reload(true);
    }
  });
}
