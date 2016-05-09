angular.module('app.controllers.splitted').controller('welcomeCtrl', [
  '$scope',
  '$rootScope',
  '$cookies',
  '$auth',
  'users',
  '$state',
  '$rootScope',
  '$timeout',
  '$cordovaDevice',
  '$window',
  function($scope, $rootScope, $cookies, $auth, users, $state, $rootScope, $timeout, $cordovaDevice, $window) {

    var isWebView = ionic.Platform.isWebView();
    var isIPad = ionic.Platform.isIPad();
    var isIOS = ionic.Platform.isIOS();
    var isAndroid = ionic.Platform.isAndroid();
    var isWindowsPhone = ionic.Platform.isWindowsPhone();

    $scope.startTrial = function() {
      if(isWebView) {
        console.log("This is a WebView!");
        var deviceId = "undefinedDeviceIdBecauseDeviceIsWebView";
        var deviceType = "WebView";
      } else if(isIPad) {
        console.log("This is an IPad!");
        var deviceId = $cordovaDevice.getUUID();
        var deviceType = "IPad";
      } else if(isIOS) {
        console.log("This is iOS!");
        var deviceId = $cordovaDevice.getUUID();
        var deviceType = "iOS";
      } else if(isAndroid) {
        console.log("This is Android!");
        var deviceId = $cordovaDevice.getUUID();
        var deviceType = "Android";
      } else if(isWindowsPhone) {
        console.log("This is a Windows Phone!");
        var deviceId = $cordovaDevice.getUUID();
        var deviceType = "Windows Phone";
      } else {
        var deviceId = "undefinedDeviceIdBecauseDeviceIsUnknown";
        var deviceType = "Unknown";
      }
      users.startTrial({
        deviceId: deviceId,
        deviceType: deviceType
      }).then(function(res){
        $window.localStorage.satellizer_token = res.data.token;
        $window.localStorage.currentUser = JSON.stringify(res.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $rootScope.satellizer_token = $window.localStorage.satellizer_token;
        $state.go('tabsController.add');
      });
      // TODO: Error Handling
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    var isAuthenticated = $auth.isAuthenticated();

    if(isAuthenticated) {
      console.log("User is Authenticated! Redirect him to Results page.");
      $state.go('tabsController.results')
    } else {
      console.log("User is not Authenticated.")
    };

    $timeout(function() {
      console.log(users.deviceUUID);
    }, 3000);

  }]);