//function registerServiceWorker() {
  console.log("function 1 of app.js");
  if ('serviceWorker' in navigator) {
    // enregistrement du fichier 'service-worker.js' présent à la racine de l'application
    navigator.serviceWorker.register('/fmorel002.github.io/sw.js').then(function (reg) {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
      subscribeDevice();
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
//}

function subscribeDevice() {
console.log("function 2 app.js");
  navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    // Demande d'inscription au Push Server (1)
    return serviceWorkerRegistration.pushManager.subscribe({ userVisibleOnly: true });
  }).then(function (subscription) {
    //sauvegarde de l'inscription dans le serveur applicatif (2)
    fetch('/fmorel002.github.io/register-to-notification.php', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(subscription)
    }).then(function (response) {
      return response.json();
    }).catch(function (err) {
      console.log('Could not register subscription into app server', err);
    });
  }).catch(function (subscriptionErr) {
    // Check for a permission prompt issue
    console.log('Subscription failed ' + subscriptionErr);
  });
}


/*this.onpush = function(event) {
  console.log(event.data);
  // From here we can write the data to IndexedDB, send it to any open
  // windows, display a notification, etc.
  showNotification();
}

navigator.serviceWorker.register('/fmorel002.github.io/sw.js', { scope: '/fmorel002.github.io/' }).then(
  function(serviceWorkerRegistration) {
    if(serviceWorkerRegistration.installing) {
      console.log('Service worker installing');
    } else if(serviceWorkerRegistration.waiting) {
      console.log('Service worker installed');
    } else if(serviceWorkerRegistration.active) {
      console.log('Service worker active');
      serviceWorkerRegistration.showNotification("Vibration Sample");
    }
    serviceWorkerRegistration.pushManager.subscribe().then(
      function(pushSubscription) {
        console.log(pushSubscription.endpoint);
        showNotification();
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, an XMLHttpRequest.
      }, function(error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
      }
    );
  });

  function showNotification() {
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        console.log("show notifs1");
        navigator.serviceWorker.ready.then(function(registration) {
          console.log("show notifs2");
          registration.showNotification('Vibration Sample');

        });
      }
    });
  }*/

// register service worker

/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/fmorel002.github.io/sw.js', { scope: '/fmorel002.github.io/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

// function for loading each image via XHR

function imgLoad(imgJSON) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', imgJSON.url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        var arrayResponse = [];
        arrayResponse[0] = request.response;
        arrayResponse[1] = imgJSON;
        resolve(arrayResponse);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

var imgSection = document.querySelector('section');

window.onload = function() {

  // load each set of image, alt text, name and caption
  for(var i = 0; i<=Gallery.images.length-1; i++) {
    imgLoad(Gallery.images[i]).then(function(arrayResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var myCaption = document.createElement('caption');
      var imageURL = window.URL.createObjectURL(arrayResponse[0]);

      myImage.src = imageURL;
      myImage.setAttribute('alt', arrayResponse[1].alt);
      myCaption.innerHTML = '<strong>' + arrayResponse[1].name + '</strong>: Taken by ' + arrayResponse[1].credit;

      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);
      myFigure.appendChild(myCaption);

    }, function(Error) {
      console.log(Error);
    });
  }
};


<script type="text/javascript">
$(document).ready(function(){
$('.button').click(function(){
  var clickBtnValue = $(this).val();
  var ajaxurl = 'ajax.php',
  data =  {'action': clickBtnValue};
  $.post(ajaxurl, data, function (response) {
      // Response div goes here.
      alert("action performed successfully");
  });
});

});
</script>*/
