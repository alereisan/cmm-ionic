angular.module('app.controllers', [])

  .controller('tabsCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/addCriteriaModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(u) {
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

})

  .controller('resultsCtrl', function($scope) {

})

  .controller('criteriasCtrl', function($scope, $ionicModal) {

  $ionicModal.fromTemplateUrl('templates/editCriteriaModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createContact = function(u) {
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };
})

  .controller('addCriteriaCtrl', function($scope) {

  })

    .controller('editCriteriaCtrl', function($scope) {

  })

    .controller('loginCtrl', function($scope) {

  })

    .controller('signupCtrl', function($scope) {

  })

    .controller('settingsCtrl', function($scope) {

  })

    .controller('listingCtrl', function($scope) {

  })

    .controller('premiumCtrl', function($scope) {

  })
