angular.module('app.controllers', [])

  .controller('tabsCtrl', function($scope, $ionicModal, $state) {

  $ionicModal.fromTemplateUrl('templates/addCriteriaModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.criterias = [
    {"tag": "Alpha Romeo 147", "max_price": "10000", "max_km": "50000", "min_year": "2002", "max_year": "2016", "fuel": "Diesel", "autoscout24_de": true, "autoscout24_at": true, "willhaben": true},
    {"tag": "Tesla Model 3", "max_price": "10000", "max_km": "50000", "min_year": "2002", "max_year": "2016", "fuel": "Diesel", "autoscout24_de": false, "autoscout24_at": true, "willhaben": true},
    {"tag": "BMW 330i", "max_price": "10000", "max_km": "50000", "min_year": "2002", "max_year": "2016", "fuel": "Diesel", "autoscout24_de": true, "autoscout24_at": true, "willhaben": false},
    {"tag": "Jeep Grand Cherokee", "max_price": "10000", "max_km": "50000", "min_year": "2002", "max_year": "2016", "fuel": "Diesel", "autoscout24_de": true, "autoscout24_at": true, "willhaben": true},
    {"tag": "Audi A8", "max_price": "10000", "max_km": "50000", "min_year": "2002", "max_year": "2016", "fuel": "Diesel", "autoscout24_de": true, "autoscout24_at": false, "willhaben": true}
  ];

  $scope.createCriteria = function(criteria) {
    $scope.criterias.push({
      tag: criteria.tag,
      max_price: criteria.max_price,
      max_km: criteria.max_km,
      min_year: criteria.min_year,
      max_year: criteria.max_year,
      fuel: criteria.fuel,
      autoscout24_de: criteria.autoscout24_de,
      autoscout24_at: criteria.autoscout24_at,
      willhaben: criteria.willhaben
    });
    $state.go('tabsController.criterias');
    $scope.modal.hide();
  };

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

  .controller('loginCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
})

  .controller('signupCtrl', function($scope, $auth) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };
})

  .controller('settingsCtrl', function($scope) {

})

  .controller('listingCtrl', function($scope) {

})

  .controller('premiumCtrl', function($scope) {

})
