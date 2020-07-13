self.addEventListener('install', function (event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
        caches.open('static').then(function (cache) {
            cache.addAll(['/', '/index.html', '/app.js', '/manifest.json']);
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activating Service Worker ....', event);
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function (res) {
                    return caches.open('dynamic').then(function (cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    });
                });
            }
        })
    );
});

self.addEventListener('push', (event) => {
    console.info('Event: Push');
  
    var title = 'Push notification demo';
    var body = {
      'body': 'click to return to application',
      'tag': 'demo',
      'icon': './images/icons/apple-touch-icon.png',
      'badge': './images/icons/apple-touch-icon.png',
      //Custom actions buttons
      'actions': [
        { 'action': 'yes', 'title': 'I ♥ this app!'},
        { 'action': 'no', 'title': 'I don\'t like this app'}
      ]
    };
  
    event.waitUntil(self.registration.showNotification(title, body));
  });