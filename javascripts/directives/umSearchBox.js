(function () {
    'use strict';

    angular
        .module('umDirectives')
        .directive('umSearchBox', function() {
        	return {
        		restrict: 'E',
                controller: 'SearchBoxController',
                controllerAs: 'searchBoxCtrl',
        		templateUrl: '../../views/umSearchBox.html',
        	}
        })
})();
