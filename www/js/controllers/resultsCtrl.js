angular.module('app.controllers.splitted').controller('resultsCtrl', [
  '$scope',
  '$state',
  'cars',
  '$timeout',
  function($scope, $state, cars, $timeout) {

    $scope.cars = cars.cars;

    $scope.openDetailView = function(car) {
      cars.copyCar(car);
      $state.go('tabsController.results.detailView', {id: car.id});
    };

    var page = 0;
    $scope.allLoaded = false;
    $scope.firstLoading = true;

    $scope.loadMore = function() {
      cars.getResults(page).success(function(items) {
        if(items.length < 1) {
          $scope.allLoaded = true;
        }
        page++;
        $scope.cars = $scope.cars.concat(items);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    //$scope.$on('$stateChangeSuccess', function() {
    //page = 0;
    //$scope.loadMore();
    //});

    $scope.doRefresh = function() {
      cars.getResults(0).success(function(items) {
        $scope.cars = items;
        page = 1;
        $scope.allLoaded = false;
        // Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      })
    };
  }]);