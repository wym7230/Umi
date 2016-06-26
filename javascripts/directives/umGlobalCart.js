(function () {
    'use strict';

    angular
      .module('umDirectives')
      .directive('umGlobalCart', function() {
        return {
          restrict: 'E',
          controller: 'GlobalCartController',
          controllerAs: 'globalCartCtrl',
          templateUrl: '../../views/umGlobalCart.html',
        };
      });
})();