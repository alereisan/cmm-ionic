angular.module('app.controllers.splitted').controller('tabsCtrl', [
  '$scope',
  '$ionicModal',
  '$state',
  'ionicToast',
  'criterias',
  'cars',
  '$cookies',
  '$timeout',
  '$window',
  '$auth',
  function($scope, $ionicModal, $state, ionicToast, criterias, cars, $cookies, $timeout, $window, $auth, $cordovaDevice) {

    document.addEventListener("deviceready", function () {

      var device = $cordovaDevice.getDevice();

      var cordova = $cordovaDevice.getCordova();

      var model = $cordovaDevice.getModel();

      var platform = $cordovaDevice.getPlatform();

      $scope.uuid = $cordovaDevice.getUUID();
      console.log("The device UUID is: ", uuid );

      var version = $cordovaDevice.getVersion();

    }, false);


    $scope.criterias = criterias.criterias;
    $scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

    $scope.$watch(function () { return $window.localStorage.getItem('currentUser'); },function(newVal,oldVal){
      if(oldVal!==newVal){
        $scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));
      }
    })

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $ionicModal.fromTemplateUrl('templates/addCriteriaModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    $scope.criteria = [];
    $scope.stepNumber = 1;
    $scope.hideTabBar = false;

    $scope.createCriteria = function(criteria) {
      if(!criteria.tags || criteria.tags === '') {
        ionicToast.show('Please complete the form.', 'bottom', false, 5000);
        return;
      }
      criterias.create({
        tags: criteria.tags,
        maxPrice: criteria.maxPrice,
        maxKmState: criteria.maxKmState,
        minBuildYear: criteria.minBuildYear,
        diesel: criteria.diesel
      }).then(function(res){
        $state.go('tabsController.criterias');
        $scope.modal.hide();
        ionicToast.show('Criteria created.', 'bottom', false, 5000);
      });
    };
  }]);