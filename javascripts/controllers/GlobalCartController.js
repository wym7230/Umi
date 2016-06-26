(function () {
    'use strict';

    angular
        .module('umi')
        .controller('GlobalCartController', GlobalCartController);

    GlobalCartController.$inject = ['$scope', '$rootScope', 'ItemService'];
    function GlobalCartController($scope, $rootScope, ItemService) {
    	var globalCartCtrl = this;
        globalCartCtrl.remove = remove;
        globalCartCtrl.addQuantity = addQuantity;
    	globalCartCtrl.checkOut = checkOut;

        function remove(item) {
            ItemService.removeFromGlobalCart(item);
        };

        function addQuantity() {

        };

    	function checkOut() {
    	};

    };

})();