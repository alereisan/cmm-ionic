// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
  'ionic',
  'ionic.service.core',
  'satellizer',
  'ionic-toast',
  'stripe.checkout',
  'ngCookies',
  'app.controllers.splitted',
  'app.services.splitted',
  'app.controllers',
  'app.routes',
  'app.services',
  'app.directives',
  'app.auth',
  'ui.scroll',
  'ui.scroll.jqlite',
  'pascalprecht.translate',
  'app.translations'
])

  .run(function($ionicPlatform, users) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log("New Notification: ");
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      },
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
      push.saveToken(token);  // persist the token in the Ionic Platform
      // Send Push to backend
      users.sendDeviceToken({
        token: token.token
      });
    });
  });
})

  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top');
  })