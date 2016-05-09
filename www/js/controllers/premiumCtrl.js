angular.module('app.controllers.splitted').controller('premiumCtrl', [
  '$scope',
  'payments',
  'users',
  '$timeout',
  'ionicToast',
  '$ionicPopup',
  function($scope, payments, users, $timeout, ionicToast, $ionicPopup) {

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