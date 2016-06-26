(function () {
    'use strict';

    angular
        .module('umi')
        .factory('ItemService', ItemService);

    ItemService.$inject = ['$rootScope','$http', '$cookies'];
	function ItemService($rootScope, $http, $cookies) {
		var service = {};


        service.getItemDetails = getItemDetails;
        service.addItem = addItem;
        service.removeFromGlobalCart = removeFromGlobalCart;
        service.getCart = getCart;
        service.updateCart = updateCart;
        return service;


        function addItem(item) {
            var cart = $rootScope.globals.cart;
            if(cart[item.id]){
                cart[item.id].number++;
            } else {
                cart[item.id] = {
                    "id": item.id,
                    "name": item.name,
                    "price": item.price,
                    "number": 1
                }
            }
            updateCart(cart);
        }

        function removeFromGlobalCart(item) {
            var cart = $rootScope.globals.cart;
            cart[item.id] = null;
            // var newCart = [];
            // angular.forEach(cart, function(currentItem){
            //     if (currentItem.id != item.id) {
            //         newCart[currentItem.id] = cart[currentItem.id];
            //     }
            // });
            
            updateCart(newCart);
        }

        function getCart(){

            $http.get('/getcart')
            .then(function (response){
                if (response.data.cart.trim().length != 0) {
                    var cart = new Array();
                    var itemList = response.data.cart.split("_");
                    for (var i = 0; i < itemList.length; i++) {
                        var singleItem = itemList[i].split(":");
                        if (singleItem.length == 4) {
                            cart[singleItem[0].trim()] = {"id" : singleItem[0].trim(),
                                                        "name" : singleItem[1].trim(),
                                                        "price" : singleItem[2].trim(),
                                                        "number" : singleItem[3].trim()}
                        }
                    }
                    updateCart(cart);
                }
            });
        }

        function updateCart(cart){
            console.log(cart);
            $rootScope.globals.cart = cart;
            $cookies.putObject('cart', $rootScope.globals.cart);
            var cartInfo = "";
            angular.forEach(cart, function(currentItem){
                cartInfo += currentItem.id + ":";
                cartInfo += currentItem.name  + ":";
                cartInfo += currentItem.price  + ":";
                cartInfo += currentItem.number;
                cartInfo += "_";
            });
            if (cartInfo.length > 0 && cartInfo[cartInfo.length - 1] === "_") {
                cartInfo = cartInfo.substring(0, cartInfo.length - 1);
            }
            if ($rootScope.globals.currentUser) {
                $http.get('/updatecart?cart=' + cartInfo)
                .then(handleSuccess, handleError(''));
            }
        }

        function getItemDetails(id) {
            return $http.get('/details?id=' + id)
            	.then(handleSuccess, handleError('Error getting item detail'));
        }

        function handleSuccess(data) {
            return data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
	};
})();