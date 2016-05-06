angular.module('app.services.splitted').factory('users', [
  '$http',
  function($http){

    var o = {
      currentUser: []
    };

    var url = "http://185.101.93.12:8080";

    o.getLoggedInUser = function() {
      return $http.get(url + '/user/loggedinuser').success(function(data) {
        angular.copy(data, o.currentUser);
      });
    };

    o.sendDeviceToken = function(token) {
      return $http.post(url + '/notification/saveToken', token).success(function(data) {
        
      });
    };

    return o;

  }]);