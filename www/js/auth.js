angular.module('app.auth', [])

  .config(function($authProvider) {

  var commonConfig = {
    popupOptions: {
      location: 'no',
      toolbar: 'yes',
      width: window.screen.width,
      height: window.screen.height
    }
  };

  if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
    $authProvider.cordova = true;
    commonConfig.redirectUri = 'http://localhost/';
  };

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '749121558557564',
    url: 'http://185.101.93.12:8080/auth/facebook'
  }));

  $authProvider.google(angular.extend({}, commonConfig, {
    clientId: '170853427136-o2oc0uono1i8cv3k9re92ff1bmg6g8ur.apps.googleusercontent.com',
    url: 'http://185.101.93.12:8080/auth/google'
  }));

  $authProvider.platform = 'mobile';
  $authProvider.baseUrl = 'http://185.101.93.12:8080/';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  //$authProvider.httpInterceptor = false;
  //$authProvider.withCredentials = false;


});