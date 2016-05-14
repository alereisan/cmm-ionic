angular.module('app.controllers.splitted').controller('premiumCtrl', [
  '$scope',
  'payments',
  'users',
  '$timeout',
  'ionicToast',
  '$ionicPopup',
  '$ionicPlatform',
  '$ionicLoading',
  function($scope, payments, users, $timeout, ionicToast, $ionicPopup, $ionicPlatform, $ionicLoading) {

    var productIds = ['cmm_premium_subscription', 'cmm_premium_1m'];

    var spinner = '<ion-spinner icon="dots" class="spinner-stable"></ion-spinner><br/>';

    $scope.loadProducts = function () {
      $ionicLoading.show({ template: spinner + 'Loading Products...' });
      inAppPurchase
        .getProducts(productIds)
        .then(function (products) {
        $ionicLoading.hide();
        console.log("Products loaded: ", products);
        $scope.products = products;
      })
        .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
      });
    };

    $scope.buy = function (productId) {

      $ionicLoading.show({ template: spinner + 'Purchasing...' });
      inAppPurchase
        .buy(productId)
        .then(function (data) {
        console.log(JSON.stringify(data));
        console.log('consuming transactionId: ' + data.transactionId);
        return inAppPurchase.consume(data.type, data.receipt, data.signature);
      })
        .then(function (receipe) {
        var alertPopup = $ionicPopup.alert({
          title: 'Purchase was successful!',
          template: 'Check your console log for the transaction data'
        });
        console.log('consume done!');
        $ionicLoading.hide();
        console.log('Receipe: ', receipe);
        payments.validateIAP(receipe).then(function(resp) {
          ionicToast.show('CMM Premium aktiviert.', 'bottom', false, 5000);
        });
      })
        .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });

    };

    $scope.restore = function () {
      $ionicLoading.show({ template: spinner + 'Restoring Purchases...' });
      inAppPurchase
        .restorePurchases()
        .then(function (purchases) {
        $ionicLoading.hide();
        console.log(JSON.stringify(purchases));
        $ionicPopup.alert({
          title: 'Restore was successful!',
          template: 'Check your console log for the restored purchases data'
        });
      })
        .catch(function (err) {
        $ionicLoading.hide();
        console.log(err);
        $ionicPopup.alert({
          title: 'Something went wrong',
          template: 'Check your console log for the error details'
        });
      });
    };


    $scope.paymentPackages = payments.paymentPackages;
    $scope.activePaymentPackage = [];
    $scope.payParams = [];
    $scope.currentUser = users.currentUser;
    $scope.stripePublishable = payments.stripePublishable;

    $timeout(function() {
      payments.getPaymentPackages().then(function(res){
        console.log(res);
      });
      users.getLoggedInUser().then(function(res) {
        console.log("Resolved LoggedInUser: ", res);
      });
    }, 0);

    $scope.setPaymentPackage = function(p) {
      $scope.activePaymentPackage = p;
    };

    $scope.doCheckout = function(token) {
      $scope.payParams.token = token;
      $scope.payParams.activePlan = $scope.activePaymentPackage;

      payments.sendStripeToken($scope.activePaymentPackage.id, token).then(function(){
        ionicToast.show('CMM Premium activated.', 'bottom', false, 5000);
        if($scope.activePaymentPackage.subscription) {
          $scope.currentUser.subscriber = true;
        } else {
          $scope.currentUser.remainingLicenseDuration = ($scope.activePaymentPackage.licenseDuration * 30);
        }
      });
    };

    $scope.cancelSubscription = function() {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Cancel Subscription',
        template: 'Are you sure you want to cancel your CMM Premium Subscription?'
      });

      confirmPopup.then(function(res) {
        if(res) {
          payments.cancelSubscription().then(function(res) {
            $scope.currentUser.subscriber = false;
          });
        } else {
          console.log('You are not sure');
        }
      });
    };

  }]);