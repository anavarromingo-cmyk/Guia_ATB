// Guía ATB HNJS service worker — cache estática para funcionar sin conexión.
const CACHE = "guia-atb-hnjs-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./pedpal.css",
  "./app.js",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
  "./favicon-32.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function store(req, res) {
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
  }
  return res;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => store(req, res))
        .catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Cache-first con revalidación en segundo plano (el PDF se guarda al abrirlo por primera vez).
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => store(req, res)).catch(() => cached);
      if (cached) {
        event.waitUntil(network);
        return cached;
      }
      return network;
    })
  );
});
