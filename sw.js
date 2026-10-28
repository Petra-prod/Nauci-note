const CACHE = "fabia-v1";
const FILES = ["./", "index.html", "fonts.css", "manifest.webmanifest", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png", "fonts/012b611074.woff2", "fonts/373a90ecd1.woff2", "fonts/5058c84a1f.woff2", "fonts/798ec6b6b8.woff2", "fonts/c1ac3b0acf.woff2", "fonts/c6ff65ab0f.woff2", "fonts/e55a4e0ece.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if(e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch:true }).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  }).catch(() => caches.match("index.html"))));
});
