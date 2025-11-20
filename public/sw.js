// public/sw.js
// SW para MVP PWA de AlertaVecinal - versión v2 (network-first)

const CACHE_NAME = 'alerta-cache-v2'
const PRECACHE_URLS = ['/', '/index.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  )
})

// Limpiar cachés viejas (v1, etc.)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
})

// Estrategia network-first: primero intentamos ir a la red,
// si falla (sin internet), usamos lo que haya en caché.
self.addEventListener('fetch', (event) => {
  const { request } = event

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})
