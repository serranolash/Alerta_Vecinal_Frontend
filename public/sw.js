// SW mínimo para MVP PWA de AlertaVecinal
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('alerta-cache-v1').then((cache) =>
      cache.addAll(['/','/index.html','/app'])
    )
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  )
})
