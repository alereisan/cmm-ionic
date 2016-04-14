angular.module('app.auth', [])

  .config(function($authProvider) {

  $authProvider.facebook({
    clientID: ' Facebook App ID'
  });

  $authProvider.google({
    clientId: 'Google Client ID'
  });

  $authProvider.baseUrl = 'http://52.58.72.73/';
  $authProvider.loginUrl = '/login';
  $authProvider.signupUrl = '/User/save.json';
  //$authProvider.httpInterceptor = false;
  //$authProvider.withCredentials = false;


});