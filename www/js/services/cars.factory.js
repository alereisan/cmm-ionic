angular.module('app.services.splitted').factory('cars', [
  '$http',

  function($http){
    var o = {
      cars: [],
      openedCar: []
    };

    var url = "http://185.101.93.12:8080";

    o.incrementCarClick = function(carId) {
      return $http.post(url + '/carclick/save', carId).success(function(data) {
      });
    };

    o.getResults = function(page) {
      return $http.get(url + '/car/list/' + page).success(function(data) {
        //o.cars.push(data);
      });
    };

    o.copyCar = function(car) {
      console.log("copying car: " + car.title);
      angular.copy(car, o.openedCar);
      console.log("o.openedCar: " + o.openedCar.title);
    };

    o.getOpenedCar = function(id) {
      return $http.get(url + '/car/detail/' + id).success(function(data) {
        angular.copy(data, o.openedCar);
      });
    };

    return o;
  }]);