angular.module('app.controllers.splitted').controller('signupCtrl', [
  '$scope',
  '$auth',
  '$ionicPopup',
  '$state',
  '$window',
  '$rootScope',
  function($scope, $auth, $ionicPopup, $state, $window, $rootScope) {

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(response) {
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $state.go('tabsController.results');
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!'
      })
    })
      .catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })

    });
  };

  $scope.user = [];

  var user = {
    email: $scope.user.email,
    password: $scope.user.password
  };

  $scope.signup = function() {
    $auth.signup({
      email: $scope.user.email,
      password: $scope.user.password
    })
      .then(function(response) {
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully signed up!'
      }).then(function() {
        $state.go('tabsController.results');
      })
    })
      .catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };

  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

}]);