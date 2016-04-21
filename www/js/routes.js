angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    controller: 'tabsCtrl as tabs',
    resolve: {
      loginRequired: loginRequired,
      criteriaPromise: ['criterias', function(criterias){
        console.log("Inside criteriaPromise");
        return criterias.getList();
      }]
    },
    abstract:true
  })

    .state('tabsController.results', {
    url: '/results',
    views: {
      'tab1': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl',
        resolve: {
          loginRequired: loginRequired,
          resultPromise: ['cars', function(cars){
            console.log("Inside resultPromise");
            return cars.getResults();
          }]
        }
      }
    }
  })

    .state('tabsController.results.detailView', {
    url: '/car/:id',
    views: {
      'tab1@tabsController': {
        templateUrl: 'templates/detail-view.html',
        controller: 'detailViewCtrl'
      }
    }
  })

    .state('tabsController.add', {
    url: '/add',
    views: {
      'tab2': {
        templateUrl: 'templates/add.html',
        controller: 'tabsCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('tabsController.add.tags', {
    url: '/tags',
    views: {
      'tags': {
        templateUrl: 'templates/add-step1.html',
        controller: 'tabsCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('tabsController.add.specs', {
    url: '/specs',
    views: {
      'specs': {
        templateUrl: 'templates/add-step2.html',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('tabsController.add.fuel', {
    url: '/fuel',
    views: {
      'fuel': {
        templateUrl: 'templates/add-step3.html',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('tabsController.add.providers', {
    url: '/providers',
    views: {
      'providers': {
        templateUrl: 'templates/add-step4.html',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('tabsController.criterias', {
    url: '/criterias',
    views: {
      'tab3': {
        templateUrl: 'templates/criterias.html',
        controller: 'criteriasCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      }
    }
  })

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

    .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl',
    resolve: {
      skipIfLoggedIn: skipIfLoggedIn
    }
  })

    .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })

    .state('listing', {
    url: '/listing',
    templateUrl: 'templates/listing.html',
    controller: 'listingCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })

    .state('premium', {
    url: '/premium',
    templateUrl: 'templates/premium.html',
    controller: 'premiumCtrl',
    resolve: {
      loginRequired: loginRequired
    }
  })

    .state('info', {
    url: '/info',
    templateUrl: 'templates/info.html',
    controller: 'infoCtrl'
  })

    .state('about', {
    url: '/about',
    templateUrl: 'templates/about.html',
    controller: 'aboutCtrl'
  })

    .state('imprint', {
    url: '/imprint',
    templateUrl: 'templates/imprint.html',
    controller: 'imprintCtrl'
  })

  $urlRouterProvider.otherwise('/page1/results')

  function skipIfLoggedIn($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.reject();
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  }

  function loginRequired($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
      deferred.resolve();
    } else {
      $location.path('/login');
    }
    return deferred.promise;
  }

});