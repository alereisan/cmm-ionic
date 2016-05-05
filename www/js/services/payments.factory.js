angular.module('app.services.splitted').factory('payments', [
  '$http',
  function($http) {

    var o = {
      paymentPackages: [],
      paid: false,
      activePlan: [],
      stripePublishable: []
    };

    var url = "http://185.101.93.12:8080";

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

    o.cancelSubscription = function() {
      return $http.post(url + '/payment/cancel');
    };

    return o;
    
  }]);