(function () {
    'use strict';

    angular
        .module('umi')
        .factory('CategoryService', CategoryService);

    ItemsService.$inject = ['$scope','$http'];
	function ItemsService($scope , $http) {
		var url = 'http://52.10.176.132/cuisine';
  			return $http.get(url)
	            .success(function(data) {
	              return data;
	            })
	            .error(function(err) {
	              return err;
            });
	};
})();