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
  function($scope, $ionicModal, $state, ionicToast, criterias, cars, $cookies, $timeout, $window, $auth) {

    $scope.criterias = criterias.criterias;
    $scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

    // Load Criterias (Async)
    $timeout(function() {
      criterias.getList().then(function(res) {
        $scope.criterias = criterias.criterias;
      })
    }, 0);

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
        // TODO: CHECK IF USER IS SUBSCRIBER
      } else if($scope.criterias.length >= 5) {
        ionicToast.show('Upgrade for unlimited criterias.', 'bottom', false, 5000);
        $state.go('premium');
      } else {
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
        })
      }
    };
  }]);