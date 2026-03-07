const CACHE_NAME = 'masquehigh-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './images/image1.jpg', './images/image2.jpg', './images/image3.jpg', './images/image4.jpg',
  './images/image5.jpg', './images/image6.jpg', './images/image7.jpg', './images/image8.jpg',
  './images/image9.jpg', './images/image10.jpg', './images/image11.jpg', './images/image12.jpg',
  './images/image13.jpg', './images/image14.jpg', './images/image15.jpg', './images/image16.jpg',
  './images/image17.jpg', './images/gorila.jpg', './images/placeholder.jpg'
];

// Instalación
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activación
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(res => res || fetch(e.request))
      .catch(() => caches.match('./index.html'))
  );
});
