angular.module('app.controllers.splitted').controller('signupCtrl', [
  '$scope',
  '$auth',
  '$ionicPopup',
  '$state',
  '$window',
  '$rootScope',
  'users',
  function($scope, $auth, $ionicPopup, $state, $window, $rootScope, users) {

    var push = new Ionic.Push({
      "debug": true,
      "onNotification": function(notification) {
        var payload = notification.payload;
        console.log(notification, payload);
      },
      "onRegister": function(data) {
        console.log(data.token);
        console.log("Registering...");
      }
    });

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

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
        push.register(function(token) {
          // Log out your device token (Save this!)
          console.log("Got Token:",token.token);
          // Send Push to backend
          users.sendDeviceToken({
            token: token.token
          });
        });
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