angular.module('app.controllers.splitted').controller('infoCtrl', [
  '$scope',
  function($scope) {

  $scope.infos = [
    {"title": "About", "state": "about"},
    //{"title": "Impressum", "state": "imprint"},
    {"title": "Datenschutz", "state": "privacy"},
    //{"title": "FAQ", "state": "faq"},
  ];
    
}]);