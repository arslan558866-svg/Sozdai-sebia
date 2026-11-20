const CACHE = "sozday-sebya-v3";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./bear-mascot.png", "./exercises/exercise-01.jpg", "./exercises/exercise-02.jpg", "./exercises/exercise-03.jpg", "./exercises/exercise-04.jpg", "./exercises/exercise-05.jpg", "./exercises/exercise-06.jpg", "./exercises/exercise-07.jpg", "./exercises/exercise-08.jpg", "./exercises/exercise-09.jpg", "./exercises/exercise-10.jpg", "./exercises/exercise-11.jpg", "./exercises/exercise-12.jpg", "./exercises/exercise-13.jpg", "./exercises/exercise-14.jpg", "./exercises/exercise-15.jpg", "./exercises/exercise-16.jpg"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
