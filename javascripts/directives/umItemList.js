(function () {
    'use strict';

    angular
        .module('umDirectives')
        .directive('umItemList', function() {
        	return {
        		restrict: 'E',
        		scope: {},
                controller: ['$scope', function($scope){
                    
                }],
        		templateUrl: '../../views/umItemList.html',
        	}
        })
})();
