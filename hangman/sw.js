const CACHE_NAME = 'Proyek Mobweb';

var urlsToCache = [
	'index.html',
	'offline.html',
	'assets/css/style.css',
	'assets/js/game.js',
	'assets/js/wordBank.min.js',
	'assets/js/wordList.min.js'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('Opened cache');
				return cache.addAll(urlsToCache);
			})
			.then(function() {
				self.skipWaiting();
			})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			cache.match(event.request, {ignoreSearch: true});
		})
		.then(function(response) {
			return response || fetch(event.request);
		})
	);
});
