angular.module('app.controllers.splitted').controller('settingsCtrl', [
  '$scope',
  '$state',
  '$timeout',
  'payments',
  function($scope, $state, $timeout, payments) {
  $scope.paid = payments.paid;
  $scope.activePlan = payments.activePlan;

  $scope.goToPremium = function() {

    $timeout(function(){
      $scope.paid = false;
      $state.go('premium');
    }, 0);
  };

  $scope.$watch(function () { return payments.paid },function(newVal,oldVal){
    if(oldVal!==newVal){
      $scope.paid = payments.paid;
    };
  });

}]);