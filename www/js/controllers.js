angular.module('app.controllers', [])

  .controller('tabsCtrl', function($scope, $ionicModal, $state, ionicToast, criterias, cars, $cookies, $timeout, $window, $auth) {

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

  $scope.createCriteriaStep1 = function(criteria) {
    $scope.criteria.tags = criteria.tags;
    $state.go('tabsController.add.specs');
    $scope.stepNumber = 2;
    $scope.hideTabBar = true;
  };

  $scope.createCriteriaStep2 = function(criteria) {
    $scope.criteria.maxPrice = criteria.maxPrice;
    $scope.criteria.maxKmState = criteria.maxKmState;
    $scope.criteria.minBuildYear = criteria.minBuildYear;
    $state.go('tabsController.add.fuel');
    $scope.stepNumber = 3;
    $scope.hideTabBar = true;
  };

  $scope.createCriteriaStep3 = function(criteria) {
    $scope.criteria.diesel = criteria.diesel;
    $state.go('tabsController.add.providers');
    $scope.stepNumber = 4;
    $scope.hideTabBar = true;
  };

  $scope.createCriteriaStep4 = function(criteria) {
    //TODO: GET PLATFORMS (WILLHABEN;AUTOSCOUT;..)
    if(!$scope.criteria.tags || $scope.criteria.tags === '') {
      ionicToast.show('Please complete the form.', 'bottom', false, 5000);
      $state.go('tabsController.add.tags');
      return;
    }
    criterias.create({
      tags: $scope.criteria.tags,
      maxPrice: $scope.criteria.maxPrice,
      maxKmState: $scope.criteria.maxKmState,
      minBuildYear: $scope.criteria.minBuildYear,
      diesel: $scope.criteria.diesel
    }).then(function(res){
      $state.go('tabsController.criterias');
      $scope.modal.hide();
      ionicToast.show('Criteria created.', 'bottom', false, 5000);
    });
  };
})



  .controller('resultsCtrl', function($scope, $state, cars) {
  console.log("Welcome to Results");

  $scope.cars = cars.cars;

  $scope.openDetailView = function(car) {
    cars.copyCar(car)
    console.log(car);
    $state.go('tabsController.results.detailView', {id: car.id});
  };

  var page = 0;
  $scope.allLoaded = false;

  $scope.loadMore = function() {
    cars.getResults(page).success(function(items) {
      if(items.length < 1) {
        $scope.allLoaded = true;
      }
      page++;
      console.log(items);
      $scope.cars = $scope.cars.concat(items);
      console.log($scope.cars);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMore();
  });
})

  .controller('detailViewCtrl', function($scope, $state, cars, $timeout, $stateParams) {
  $scope.openedCar = [];
  $scope.openedCar = cars.openedCar;

  $timeout(function(){
    if($scope.openedCar.length == 0) {
      console.log("Loading Car Details from Backend ...");
      cars.getOpenedCar($stateParams.id)
    } else {
      console.log("Resolved Car Details from Service!");
    }
  }, 1000);

  $scope.userClickCount = 0;

  $scope.incrementCarClick = function(car) {
    console.log("userClickCount: " + $scope.userClickCount);
    if($scope.userClickCount < 5) {
      $scope.userClickCount += 1;
      cars.incrementCarClick({
        id: $scope.openedCar.id
      });
    } else {
      $state.go('premium');
    };
  };

  console.log("Welcome to detailView: " + $scope.openedCar.title);
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

  .controller('settingsCtrl', function($scope, $state, $timeout, payments) {
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
      console.log('$scope.paid has changed!');
      $scope.paid = payments.paid;
    };
  });
})

  .controller('listingCtrl', function($scope) {

})

  .controller('premiumCtrl', function($scope, payments, users, $timeout, ionicToast) {

  $scope.paymentPackages = payments.paymentPackages;
  $scope.activePaymentPackage = [];
  $scope.payParams = [];
  $scope.currentUser = users.currentUser;

  $timeout(function() {
    payments.getPaymentPackages().then(function(){
      console.log(payments.paymentPackages);
    });
    users.getLoggedInUser();
  }, 0);

  $scope.setPaymentPackage = function(p) {
    $scope.activePaymentPackage = p;
    console.log("activePaymentPackage set to: ");
    console.log($scope.activePaymentPackage);
  };

  $scope.doCheckout = function(token) {
    $scope.payParams.token = token;
    $scope.payParams.activePlan = $scope.activePaymentPackage;
    console.log("Got Stripe token: ");
    console.log(token);
    console.log("Got PaymentPackage.id: " + $scope.activePaymentPackage.id);
    console.log($scope.payParams);

    payments.sendStripeToken($scope.activePaymentPackage.id, token).then(function(){
      ionicToast.show('CMM Premium activated.', 'bottom', false, 5000);
    });
  };

})

  .controller('addCtrl', function($scope) {

})

  .controller('infoCtrl', function($scope) {

  $scope.infos = [
    {
      "title": "About", "state": "about"
    },
    {
      "title": "Imprint", "state": "imprint"
    }
  ]
})

  .controller('aboutCtrl', function($scope) {

})

  .controller('imprintCtrl', function($scope) {

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
