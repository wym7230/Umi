(function () {
    'use strict';

    angular
        .module('umi')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = ['$scope', '$uibModalInstance', 'detail', 'ItemService'];
    function ModalInstanceController($scope, $uibModalInstance, detail, ItemService) {
    	var modalInstanceCtrl = this;
    	modalInstanceCtrl.itemDetail = detail;
    	modalInstanceCtrl.cancel = cancel;
        modalInstanceCtrl.addToGlobalCart = addToGlobalCart;

        function addToGlobalCart(item) {
            $uibModalInstance.dismiss('cancel');
        
            ItemService.addItem(item);
            //     .then(function (response) {
            //         if(response.statusText == "OK"){
            //             itemsCtrl.item = response.data;
            //         } // Add Error message if data not recived
            // });
        };

    	function cancel() {
    		
            $uibModalInstance.dismiss('cancel');
    	};

    };

})();