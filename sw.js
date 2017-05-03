this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/fmorel002.github.io/',
        '/fmorel002.github.io/index.html',
        '/fmorel002.github.io/style.css',
        '/fmorel002.github.io/app.js',
        '/fmorel002.github.io/image-list.js',
        '/fmorel002.github.io/star-wars-logo.jpg',
        '/fmorel002.github.io/gallery/bountyHunters.jpg',
        '/fmorel002.github.io/gallery/myLittleVader.jpg'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/fmorel002.github.io/gallery/myLittleVader.jpg');
  }));
});

self.addEventListener('push', function(event) {
  if (!(self.Notification && self.notification.permission === 'granted')) {
    return;
  }

  var data = {};
  if (event.data) {
    data = event.data.json();
  }
  var title = data.title || "Something Has Happened";
  var message = data.message || "Here's something you might want to check out.";
  var icon = "images/new-notification.png";

  var notification = new Notification(title, {
    body: message,
    tag: 'simple-push-demo-notification',
    icon: icon
  });

  notification.addEventListener('click', function() {
    if (clients.openWindow) {
      clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
    }
  };
});
