angular.module('app.auth', [])

  .config(function($authProvider) {

  $authProvider.facebook({
    clientID: ' Facebook App ID'
  });

  $authProvider.google({
    clientId: 'Google Client ID'
  });


});