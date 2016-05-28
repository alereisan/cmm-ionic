angular.module('app.controllers.splitted').controller('criteriasCtrl', [
  '$scope',
  '$ionicModal',
  'ionicToast',
  'criterias',
  '$timeout',
  function($scope, $ionicModal, ionicToast, criterias, $timeout) {

    $ionicModal.fromTemplateUrl('templates/editCriteriaModal.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.criterias = criterias.criterias;

    // Load Criterias (Async)
    $timeout(function() {
      criterias.getList().then(function(res) {
        $scope.criterias = criterias.criterias;
      })
    }, 0);

    $scope.openEditModal = function(criteria) {
      $scope.criteria = criteria;
      $scope.modal.show();
    };

    $scope.updateCriteria = function(criteria) {
      criterias.update({
        id: criteria.id,
        tags: criteria.tags,
        maxPrice: criteria.maxPrice,
        maxKmState: criteria.maxKmState,
        minBuildYear: criteria.minBuildYear,
        diesel: criteria.diesel
      }).then(function(res){
        ionicToast.show('Criteria updated.', 'bottom', false, 5000);
        $scope.modal.hide();
      });
    };

    $scope.deleteCriteria = function(criteria) {
      criterias.delete($scope.criteria.id).then(function(res){
        $scope.criterias.splice($scope.criterias.indexOf(criteria), 1);
        ionicToast.show('Criteria deleted.', 'bottom', false, 5000);
        $scope.modal.hide();
      });
    };
  }]);