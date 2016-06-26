(function () {
    'use strict';

    angular
        .module('umi')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$uibModal', 'ItemService'];

	function ItemsController($uibModal, ItemService) {
		var itemsCtrl = this;
		itemsCtrl.openModal = openModal;
		itemsCtrl.detail;

		function openModal(item){
			ItemService.getItemDetails(item.id)
	        	.then(function (response) {
	            	if(response.statusText == "OK"){
	            		itemsCtrl.detail = response.data;
            			$uibModalInstance.open({
            				animation: true,
							templateUrl: '../../views/itemListModal.html',
							controller: 'ModalInstanceController as modalInstanceCtrl' ,
						    resolve: {
						        detail: function () {
						        	return itemsCtrl.detail;
						        }
					    	}
						});
	           		} // Add Error message if data not recived
	        });
		};
	};

})();