angular.module('app.controllers.splitted').controller('loginCtrl', [
  '$scope',
  '$window',
  '$location',
  '$rootScope',
  '$auth',
  '$ionicPopup',
  '$state',
  'users',
  function($scope, $window, $location, $rootScope, $auth, $ionicPopup, $state) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $state.go('tabsController.results');
        $ionicPopup.alert({
          title: 'Success',
          content: 'You have successfully logged in!'
        });
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

    $scope.login = function() {
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $state.go('tabsController.results');
      }).catch(function(response) {
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