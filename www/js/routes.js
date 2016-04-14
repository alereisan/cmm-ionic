angular.module('app.routes', [])

  .config(function($stateProvider, $urlRouterProvider, StripeCheckoutProvider) {

  // You can use the provider to set defaults for all handlers
  // you create. Any of the options you'd pass to
  // StripeCheckout.configure() are valid.
  StripeCheckoutProvider.defaults({
    key: "pk_test_4jGQ8zdPbK4Y2eOpTf8ASTUX"
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    controller: 'tabsCtrl',
    abstract:true
  })

    .state('tabsController.results', {
    url: '/results',
    views: {
      'tab1': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      }
    }
  })

    .state('tabsController.criterias', {
    url: '/criterias',
    views: {
      'tab3': {
        templateUrl: 'templates/criterias.html',
        controller: 'criteriasCtrl'
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
    controller: 'signupCtrl'
  })

    .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsCtrl'
  })

    .state('listing', {
    url: '/listing',
    templateUrl: 'templates/listing.html',
    controller: 'listingCtrl'
  })

    .state('premium', {
    url: '/premium',
    templateUrl: 'templates/premium.html',
    controller: 'premiumCtrl',
    resolve: {
      // checkout.js isn't fetched until this is resolved.
      stripe: StripeCheckoutProvider.load
    }
  })

  $urlRouterProvider.otherwise('/page1/results')



});