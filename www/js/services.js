angular.module('app.services', [])

  .factory('BlankFactory', [function(){

  }])

  .factory('criterias', [
  '$http',

  function($http){
    var o = {
      criterias: []
    };

    var url = "http://52.29.189.227:8080";

    o.getList = function() {
      return $http.get(url + '/criteria/list').success(function(data) {
        angular.copy(data, o.criterias);
      });
    };

    o.getResults = function() {
      return $http.get(url + '/car/list').success(function(data) {
        angular.copy(data, o.criterias);
      });
    };

    o.create = function(criteria) {
      return $http.post(url + '/criteria/save', criteria).success(function(data){
        o.criterias.push(data);
      });
    };

    o.update = function(criteria) {
      return $http.post(url + '/criteria/save', criteria).success(function(data){
        //o.criterias.push(data);
      });
    };

    o.delete = function(id) {
      return $http.delete(url + '/criteria/delete/' + id).then(function(res){
        return res.data;
      });
    };

    return o;

  }])

  .factory('cars', [
  '$http',

  function($http){
    var o = {
      cars: [],
      openedCar: []
    };

    var url = "http://52.29.189.227:8080";

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
  }])

  .factory('users', [
  '$http',

  function($http){
    var o = {
      currentUser: []
    };

    var url = "http://52.29.189.227:8080";

    o.getLoggedInUser = function() {
      return $http.get(url + '/user/loggedinuser').success(function(data) {
        angular.copy(data, o.currentUser);
        console.log("logged in user stored on users.currentUser")
      });
    };

    return o;
  }])

  .factory('payments', [
  '$http',

  function($http){
    var o = {
      paymentPackages: [],
      paid: false,
      activePlan: [],
      stripePublishable: []
    };

    var url = "http://52.29.189.227:8080";

    o.getPaymentPackages = function() {
      return $http.get(url + '/paymentpackage/list').success(function(data) {
        angular.copy(data, o.paymentPackages);
      });
    };

    o.getStripePublishable = function() {
      return $http.get(url + '/payment/stripePublishable').success(function(data) {
        angular.copy(data, o.stripePublishable);
        console.log(o.stripePublishable);
      });
    };

    o.sendStripeToken = function(id, token) {
      return $http.post(url + '/payment/' + id, token).success(function(data) {
        o.paid = true;
      });
    };

    return o;
  }])


  .service('BlankService', [function(){

  }]);

