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

    return o;
    
}]);