angular.module('app.controllers', [])

  .controller('tabsCtrl', function($scope, $ionicModal, $state, ionicToast, criterias, cars, $cookies, $timeout, $window, $auth) {

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
})

  .controller('addCtrl', function($scope, $state) {

})

  .controller('resultsCtrl', function($scope, $state, cars) {

  $scope.cars = cars.cars;

  $scope.openDetailView = function(car) {
    cars.copyCar(car);
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
      $scope.cars = $scope.cars.concat(items);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  $scope.$on('$stateChangeSuccess', function() {
    page = 0;
    $scope.loadMore();
  });



  $scope.doRefresh = function() {
    cars.getResults(0).success(function(items) {
      $scope.cars = items;
      page = 1;
      $scope.allLoaded = false;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    })
  }
})

  .controller('detailViewCtrl', function($scope, $state, cars, $timeout, $stateParams, $window, users) {
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
  $scope.stripePublishable = payments.stripePublishable;

  $timeout(function() {
    payments.getPaymentPackages().then(function(){
    });
    users.getLoggedInUser();
  }, 0);

  $scope.setPaymentPackage = function(p) {
    $scope.activePaymentPackage = p;
  };

  $scope.doCheckout = function(token) {
    $scope.payParams.token = token;
    $scope.payParams.activePlan = $scope.activePaymentPackage;

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
