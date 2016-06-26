(function () {
    'use strict';
    angular
        .module('umi')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$http'];
    function HomeController($scope, $http) {
    	var homeCtrl = this;
    	var url = "http://52.10.176.132/list?";

    	homeCtrl.cuisine = '';

    	homeCtrl.sorting = {
    		value: 'spicy',
    		asc: false
    	};

    	homeCtrl.deliver;
    	homeCtrl.reserve;

    	homeCtrl.loaded = false;
        homeCtrl.noItem = false;
    	homeCtrl.categoryList = {};
    	homeCtrl.items = {};

    	homeCtrl.setCategory = setCategory;
    	homeCtrl.setSorting = setSorting;
    	homeCtrl.fetch = fetch;
    	homeCtrl.categoryFetch = categoryFetch;
    	categoryFetch();
    	fetch();

    	function setCategory(category) {
            homeCtrl.loaded = false;
            homeCtrl.noItem = false;

            if(homeCtrl.cuisine.match(category.cuisine)){
            	var first = true;
            	for (var i = 0; i < category.cuisine.length - 1; i++) {
            		if (homeCtrl.cuisine.charAt(i) != category.cuisine.charAt(i)){
            			first = false;
            		}
            	};
            	if(first == true){
            		homeCtrl.cuisine = homeCtrl.cuisine.slice(category.cuisine.length);
            	}else{
            		homeCtrl.cuisine = homeCtrl.cuisine.replace(',' + category.cuisine, '');
            	}
            } else if(!homeCtrl.cuisine){
            	homeCtrl.cuisine = category.cuisine;
            } else {
            	homeCtrl.cuisine += "," + category.cuisine;
            }
            fetch();
        };

        function setSorting(value) {
        	homeCtrl.loaded = false;
        	homeCtrl.noItem = false;
        	if (homeCtrl.sorting.value == 'spicy') {
        		homeCtrl.sorting.asc = true;
        	} else if (homeCtrl.sorting.value == value) {
        		homeCtrl.sorting.asc = !homeCtrl.sorting.asc;
        	};
        	homeCtrl.sorting.value = value;

        	fetch();
        }

        function fetch() {
        	var api = '';
        	if (homeCtrl.sorting.asc) {
        		api = "sort_asc=" + homeCtrl.sorting.value;
        	} else {
        		api = "sort_desc=" + homeCtrl.sorting.value;
        	};

        	if(homeCtrl.cuisine) {
        		api += "&cuisine=" + homeCtrl.cuisine;
        	};
            if (homeCtrl.deliver || homeCtrl.deliver == 0) {
                api += "&deliver=" + homeCtrl.deliver;
            };
            console.log(homeCtrl.deliver);
            if (homeCtrl.reserve || homeCtrl.reserve == 0) {
                api += "&reserve=" + homeCtrl.reserve;
            };


        	console.log(api);

            $http.get(url + api)
            .success(function(response){ 
                homeCtrl.items = response; 
                homeCtrl.loaded = true;
                if (!homeCtrl.items.length) {
                    homeCtrl.noItem = true;
                };
            });
        };

        function categoryFetch() {
            $http.get("http://52.10.176.132/cuisines")
            .success(function(response){
                homeCtrl.categoryList = response;
            });
        };

    };
})();