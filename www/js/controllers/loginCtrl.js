angular.module('app.controllers.splitted').controller('loginCtrl', [
  '$scope',
  '$window',
  '$location',
  '$rootScope',
  '$auth',
  '$ionicPopup',
  '$state',
  'users',
  function($scope, $window, $location, $rootScope, $auth, $ionicPopup, $state, users) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        push.register(function(token) {
          // Log out your device token (Save this!)
          console.log("Got Token:",token.token);
          // Send Push to backend
          users.sendDeviceToken({
            token: token.token
          });
        });
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

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
      }
    });

    $scope.login = function() {
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        push.register(function(token) {
          // Log out your device token (Save this!)
          console.log("Got Token:",token.token);
          // Send Push to backend
          users.sendDeviceToken({
            token: token.token
          });
        });
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