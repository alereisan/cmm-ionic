angular.module('app.services', [])

  .factory('BlankFactory', [function(){

  }])

  .factory('criterias', [
  '$http',

  function($http){
    var o = {
      criterias: []
    };

    var url = "http://52.58.72.73:8080";

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
      cars: []
    };

    var url = "http://52.58.72.73:8080";


    o.getResults = function() {
      return $http.get(url + '/car/list').success(function(data) {
        angular.copy(data, o.cars);
      });
    };

    return o;

  }])

  .service('BlankService', [function(){

  }]);

