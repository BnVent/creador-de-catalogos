const cacheName = "creador-de-catalogos"
const assets = [
  "/",
  "/index.html",
  "/main-style.css",
  "/scripts/banner-options.js",
  "/scripts/full-screen.js",
  "/scripts/main-script.js",
  "/icons/add-image-icon.svg",
  "/icons/arrow-down-icon.svg",
  "/icons/download-icon.svg",
  "/icons/enter-fullscreen-icon.svg",
  "/icons/exit-fullscreen-icon.svg",
  "/icons/grid-icon.svg",
  "/icons/info-icon.svg",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})