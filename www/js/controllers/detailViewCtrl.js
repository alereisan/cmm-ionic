angular.module('app.controllers.splitted').controller('detailViewCtrl', [
  '$scope',
  '$state',
  'cars',
  '$timeout',
  '$stateParams',
  '$window',
  'users',
  function($scope, $state, cars, $timeout, $stateParams, $window, users) {

  $scope.openedCar = [];
  $scope.openedCar = cars.openedCar;

  $timeout(function(){
    if($scope.openedCar.length == 0) {
      console.log("Loading Car Details from Backend ...");
      cars.getOpenedCar($stateParams.id).then(function(res){
        console.log(res);
        $scope.carImages = $scope.openedCar.detailImages.split(';');
      })
    } else {
      console.log("Resolved Car Details from Service!");
      $scope.carImages = $scope.openedCar.detailImages.split(';');
    }
  }, 1000);

  $timeout(function() {
    users.getLoggedInUser().then(function(res){
      $scope.userClickCount = res.data.clickCount;
      console.log("Resolved User Click Count: " + $scope.userClickCount);
    });
  }, 0);

  //$scope.userClickCount = 0;
  var maxClickCount = 5;

  $scope.call = function(telNumber) {
    if($scope.userClickCount < maxClickCount) {
      $window.open("tel:"+ telNumber);
      cars.incrementCarClick({
        id: $scope.openedCar.id
      }).success(function(res){
        // click was incremented in backend,
        // so increment in frontend
        $scope.userClickCount += 1;
      }).error(function(){
        // not incremented in backend,
        // do nothing
      });
    } else {
      $state.go('premium');
    };
  };

  $scope.openProvider = function(link) {
    if($scope.userClickCount < maxClickCount) {
      $window.open(link);
      cars.incrementCarClick({
        id: $scope.openedCar.id
      }).success(function(res){
        // click was incremented in backend,
        // so increment in frontend
        $scope.userClickCount += 1;
      }).error(function(){
        // not incremented in backend,
        // do nothing
      });
    } else {
      $state.go('premium');
    };
  };

  // TODO:
  $scope.sendMessage = function() {
    if($scope.userClickCount < maxClickCount) {
      $scope.userClickCount += 1;
      // TODO implement send message function
      cars.incrementCarClick({
        id: $scope.openedCar.id
      }).success(function(res){
        $scope.userClickCount += 1;
      });
    } else {
      $state.go('premium');
    };
  };
}]);