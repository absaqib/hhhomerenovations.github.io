// Service Worker for H&H Home Renovations
// Version 1.0.2 - Corrected paths for pretty URLs and added full paths for caching

const CACHE_NAME = 'hh-renovations-v3'; // Incremented version to force update
const urlsToCache = [
    // Root files
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/assets/images/logo.png',
    '/assets/images/favico.png',

    // Page entry points for "pretty URLs"
    '/pages/services/',
    '/pages/portfolio/',
    '/pages/about/',
    '/pages/contact/',

    // Full paths for direct caching
    '/pages/services/index.html',
    '/pages/portfolio/index.html',
    '/pages/about/index.html',
    '/pages/contact/index.html',

    // Critical images
    '/assets/images/housedecor.jpg',
    '/assets/images/kitchenrefurbishment.jpg',
    '/assets/images/bathrenovation.webp',
    '/assets/images/new featured.jpeg',
    '/assets/images/homepagepic1.jpeg',
    '/assets/images/homepagepic2.jpeg',
    
    // Fonts
    'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Raleway:wght@700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css'
];

// Install event - caches resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching new files');
                // Use addAll which is atomic. If one file fails, the whole cache operation fails.
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Failed to cache files during install:', error);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - cleans up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker: deleting old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serves cached content, with a network-first approach for pages
self.addEventListener('fetch', event => {
    // For HTML pages (navigation requests), try the network first.
    // If the network fails (e.g., offline), fall back to the cache.
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
            .catch(() => {
                // If the network request fails, try to find a match in the cache.
                // For a "pretty URL" like /pages/about/, we need to match /pages/about/index.html
                const url = new URL(event.request.url);
                const cacheKey = url.pathname.endsWith('/') ? url.pathname + 'index.html' : event.request;
                
                return caches.match(cacheKey)
                    .then(cachedResponse => {
                        // If we have a cached response, return it.
                        // If not, we can return a generic offline page if we had one cached.
                        return cachedResponse || caches.match('/index.html');
                    });
            })
        );
        return;
    }

    // For other assets (CSS, JS, images), use a cache-first approach.
    // This is fast because it serves directly from the cache if available.
    event.respondWith(
        caches.match(event.request).then(response => {
            // If we have a response in the cache, return it.
            // Otherwise, fetch it from the network.
            return response || fetch(event.request).then(fetchResponse => {
                // Optional: Cache newly fetched resources dynamically
                // Be careful with this, as it can fill up the cache.
                // It's often better to explicitly define what to cache.
                return fetchResponse;
            });
        })
    );
});
