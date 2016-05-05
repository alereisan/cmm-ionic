angular.module('app.controllers.splitted').controller('navCtrl', [
  '$scope',
  '$rootScope',
  '$cookies',
  '$auth',
  function($scope, $rootScope, $cookies, $auth) {

  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

}]);