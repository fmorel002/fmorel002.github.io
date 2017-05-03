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
        '/fmorel002.github.io/gallery/myLittleVader.jpg',
        '/fmorel002.github.iot/gallery/snowTroopers.jpg'
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
