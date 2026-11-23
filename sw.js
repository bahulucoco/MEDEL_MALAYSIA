// Service Worker MEDEL
// Menyimpan fail aplikasi (bukan data sistem) supaya aplikasi boleh dibuka & memaparkan
// mesej "tiada internet" walaupun luar talian. Data sentiasa diambil terus dari Apps Script.
// Naikkan nombor versi ini setiap kali fail dalam folder ini diubah.
var CACHE = 'medel-pwa-v2';
var FAIL = [
  './',
  './index.html',
  './config.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/logo-penuh.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FAIL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  // Halaman & config: rangkaian dahulu (dapat versi terkini), cache jika luar talian
  if (req.mode === 'navigate' || req.url.indexOf('config.js') > -1) {
    e.respondWith(
      fetch(req).then(function (res) {
        var salin = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req.mode === 'navigate' ? './index.html' : req, salin); });
        return res;
      }).catch(function () {
        return caches.match(req.mode === 'navigate' ? './index.html' : req);
      })
    );
    return;
  }

  // Fail lain (ikon dll): cache dahulu
  e.respondWith(caches.match(req).then(function (r) { return r || fetch(req); }));
});
