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
    $authProvider.platform = 'mobile';
    commonConfig.redirectUri = 'http://localhost/';
  };

  $authProvider.facebook(angular.extend({}, commonConfig, {
    clientId: '749121558557564'
  }));

  $authProvider.google(angular.extend({}, commonConfig, {
    clientId: '170853427136-o2oc0uono1i8cv3k9re92ff1bmg6g8ur.apps.googleusercontent.com'
  }));

  $authProvider.baseUrl = 'http://52.58.72.73:8080/';
  $authProvider.loginUrl = '/auth/login';
  $authProvider.signupUrl = '/auth/signup';
  //$authProvider.httpInterceptor = false;
  //$authProvider.withCredentials = false;


});