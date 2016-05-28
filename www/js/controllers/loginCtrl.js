angular.module('app.controllers.splitted').controller('loginCtrl', [
  '$scope',
  '$window',
  '$location',
  '$rootScope',
  '$auth',
  '$ionicPopup',
  '$state',
  'users',
  'ionicToast',
  '$timeout',
  function($scope, $window, $location, $rootScope, $auth, $ionicPopup, $state, users, ionicToast, $timeout) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $timeout(function() {
          $state.go('tabsController.results');
        }, 2000);
        ionicToast.show('Erfolgreich angemeldet!', 'bottom', false, 5000); // TODO Translation
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
        console.log("New Notification: ");
        console.log(notification, payload);
        // Show confirm Popup - if user is currently online
        $ionicPopup.confirm({
          title: 'Schnäppchen gefunden!',
          template: 'Ein gerade eingestelltes Auto passt zu deinen Kriterien. Schnäppchen anzeigen?'
        }).then(function(res) {
          if(res) {
            // Go to car deal
            $state.go('tabsController.results.detailView', {id: payload.id});
          } else {
            // Do not go to car deal
          }
        });
      },
      "onRegister": function(data) {
        console.log(data.token);
      },
      "pluginConfig": {
        "ios": {
          "badge": true,
          "sound": true
        },
        "android": {
          "iconColor": "#343434"
        }
      }
    });

    $scope.login = function() {
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      }).then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        $timeout(function() {
          $state.go('tabsController.results');
        }, 2000);
        ionicToast.show('Erfolgreich angemeldet!', 'bottom', false, 5000); // TODO Translation
        // signup for push
        push.register(function(token) {
          push.saveToken(token);  // persist the token in the Ionic Platform
          // save token localStorage
          $window.localStorage.deviceToken = token.token;
          // Send Push token to backend
          users.sendDeviceToken({
            token: token.token
          });
        });
      }).catch(function(response) {
        $ionicPopup.alert({
          title: 'Error' + response.data.code,
          content: response.data.message
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