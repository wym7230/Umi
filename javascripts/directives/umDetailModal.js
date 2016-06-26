(function () {
    'use strict';

    angular
        .module('umDirectives', [])
        .directive('umDetailModal', function() {
        	return {
        		restrict: 'E',
        		scope: {
                    show: '='
                },
                transclude: true,
                link: function(scope, element, attrs) {
                    scope.hideModal = function() {
                        scope.show = false;
                    };
                },
        		templateUrl: '../../views/itemDetail.html',
        	}
        })
})();
