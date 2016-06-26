(function () {
    'use strict';

    angular
        .module('umi')
        .controller('SearchBoxController', SearchBoxController);

    SearchBoxController.$inject = ['$scope', '$http'];

	function SearchBoxController($scope, $http) {
		var url = "http://52.10.176.132/list";
		var pendingTask;
		$scope.fetch = fetch;
		$scope.searchText = null;
		$scope.change = change;
		$scope.select = select;


		function fetch(){
			if($scope.searchText == null)
			$http.get(url + "?name=" + $scope.searchText)
            .success(function(response){ 
            	$scope.searchItems = response;
            	console.log($scope.searchItems);
            });
		};

		function change(){
			if(pendingTask){
		        clearTimeout(pendingTask);
		    }
		    pendingTask = setTimeout(fetch, 800);
		};

		// when user click a link in the drop down menu, update
		function update(name){
	      
	      change();
	    };

		function select(){
			this.setSelectionRange(0, this.value.length);
		}
	};
})();