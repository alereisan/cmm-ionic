angular.module('app.controllers.splitted').controller('signupCtrl', [
  '$scope',
  '$auth',
  '$ionicPopup',
  '$state',
  '$window',
  '$rootScope',
  'users',
  'ionicToast',
  function($scope, $auth, $ionicPopup, $state, $window, $rootScope, users, ionicToast) {

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $state.go('tabsController.results');
        ionicToast.show('Erfolgreich angemeldet!', 'bottom', false, 5000); // TODO Translation
        //$ionicPopup.alert({
          //title: 'Success',
          //content: 'You have successfully logged in!'
        //})
      })
        .catch(function(response) {
        $ionicPopup.alert({
          title: 'Error' + response.code,
          content: response.message
        })

      });
    };

    $scope.user = [];

    $scope.signup = function() {
      $auth.signup({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(response) {
        $auth.login({email: $scope.user.email, password: $scope.user.password});
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $state.go('tabsController.results');
        ionicToast.show('Erfolgreich angemeldet!', 'bottom', false, 5000); // TODO Translation
      }).catch(function(response) {
        $ionicPopup.alert({
          title: 'Error',
          content: response.data ? response.data || response.data.message : response
        });
      });
    };

    $scope.logout = function() {
      $auth.logout();
      ionicToast.show('Erfolgreich ausgeloggt!', 'bottom', false, 5000); // TODO Translation
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

  }]);