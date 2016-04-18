angular.module('app.controllers', [])

  .controller('tabsCtrl', function($scope, $ionicModal, $state, ionicToast, criterias, $cookies, $timeout, $window, $auth) {

  $scope.criterias = criterias.criterias;
  $scope.currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

  $scope.$watch(function () { return $window.localStorage.getItem('currentUser'); },function(newVal,oldVal){
    if(oldVal!==newVal){
      console.log('Local Storage data changed!');
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

})

  .controller('resultsCtrl', function($scope) {

})

  .controller('criteriasCtrl', function($scope, $ionicModal, ionicToast, criterias) {


  $ionicModal.fromTemplateUrl('templates/editCriteriaModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openEditModal = function(criteria) {
    $scope.criteria = criteria;
    $scope.modal.show();
  };

  $scope.updateCriteria = function(criteria) {
    console.log(criteria);
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
})

  .controller('addCriteriaCtrl', function($scope) {

})

  .controller('editCriteriaCtrl', function($scope) {

})

  .controller('loginCtrl', function($scope, $window, $location, $rootScope, $auth, $ionicPopup, $state) {

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(response) {
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $state.go('tabsController.results');
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!'
      });
    })
      .catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };

  $scope.user = [];

  var user = {
    email: $scope.user.email,
    password: $scope.user.password
  };

  $scope.login = function() {
    $auth.login({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(response) {
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $state.go('tabsController.results');
    }).catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };

  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
})

  .controller('signupCtrl', function($scope, $auth, $ionicPopup, $state, $window, $rootScope) {

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
      .then(function(response) {
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $state.go('tabsController.results');
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully logged in!'
      })
    })
      .catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })

    });
  };

  $scope.user = [];

  var user = {
    email: $scope.user.email,
    password: $scope.user.password
  };

  $scope.signup = function() {
    $auth.signup({
      email: $scope.user.email,
      password: $scope.user.password
    })
      .then(function(response) {
      console.log(response.data);
      $auth.login({
        email: $scope.user.email,
        password: $scope.user.password
      })
      $window.localStorage.currentUser = JSON.stringify(response.data.user);
      $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
      $ionicPopup.alert({
        title: 'Success',
        content: 'You have successfully signed up!'
      }).then(function() {
        $state.go('tabsController.results');
      })
    })
      .catch(function(response) {
      $ionicPopup.alert({
        title: 'Error',
        content: response.data ? response.data || response.data.message : response
      })
    });
  };

  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
})

  .controller('settingsCtrl', function($scope) {

})

  .controller('listingCtrl', function($scope) {

})

  .controller('premiumCtrl', function($scope) {

  this.doCheckout = function(token) {
    alert("Got Stripe token: " + token.id);
  };

})

  .controller('navCtrl', function($scope, $rootScope, $cookies, $auth) {
  //$rootScope.currentUser = $cookies.get('user');
  //console.log("$rootScope.currentUser: " + $rootScope.currentUser);
  $scope.logout = function() {
    $auth.logout();
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
})
