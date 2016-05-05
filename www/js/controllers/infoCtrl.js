angular.module('app.controllers.splitted').controller('infoCtrl', [
  '$scope',
  function($scope) {

  $scope.infos = [
    {"title": "About", "state": "about"},
    {"title": "Imprint", "state": "imprint"}
  ];
    
}]);