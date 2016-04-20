angular.module('app.directives', [])

  .directive('onValidSubmit', ['$parse', '$timeout', function($parse, $timeout) {
    return {
      require: '^form',
      restrict: 'A',
      link: function(scope, element, attrs, form) {
        form.$submitted = false;
        var fn = $parse(attrs.onValidSubmit);
        element.on('submit', function(event) {
          scope.$apply(function() {
            element.addClass('ng-submitted');
            form.$submitted = true;
            if (form.$valid) {
              if (typeof fn === 'function') {
                fn(scope, {$event: event});
              }
            }
          });
        });
      }
    }

  }])
  .directive('validated', ['$parse', function($parse) {
    return {
      restrict: 'AEC',
      require: '^form',
      link: function(scope, element, attrs, form) {
        var inputs = element.find("*");
        for(var i = 0; i < inputs.length; i++) {
          (function(input){
            var attributes = input.attributes;
            if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
              var field = form[attributes.name.value];
              if (field != void 0) {
                scope.$watch(function() {
                  return form.$submitted + "_" + field.$valid;
                }, function() {
                  if (form.$submitted != true) return;
                  var inp = angular.element(input);
                  if (inp.hasClass('ng-invalid')) {
                    element.removeClass('has-success');
                    element.addClass('has-error');
                  } else {
                    element.removeClass('has-error').addClass('has-success');
                  }
                });
              }
            }
          })(inputs[i]);
        }
      }
    }
  }])
  .directive('hideTabBar', [function($timeout) {
    var style = angular.element('<style>').html(
      '.has-tabs.no-tabs:not(.has-tabs-top) { bottom: 0; }\n' +
      '.no-tabs.has-tabs-top { top: 44px; }');
    document.body.appendChild(style[0]);
    return {
      restrict: 'A',
      compile: function(element, attr) {
        var tabBar = document.querySelector('.tab-nav');
        return function($scope, $element, $attr) {
          var scroll = $element[0].querySelector('.scroll-content');
          $scope.$on('$ionicView.beforeEnter', function() {
            tabBar.classList.add('slide-away');
            scroll.classList.add('no-tabs');
          })
          $scope.$on('$ionicView.beforeLeave', function() {
            tabBar.classList.remove('slide-away');
            scroll.classList.remove('no-tabs')
          });
        }
      }
    }
  }])

  .directive('blankDirective', [function(){

  }]);

