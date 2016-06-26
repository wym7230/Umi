(function () {
    'use strict';

    angular
        .module('umi', ['ngRoute', 'ngCookies', 'ui.bootstrap','umDirectives'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController as homeCtrl', 
                templateUrl: 'views/home.html' 
            })
            .when('/foods/new', {
                controller: 'NewPartnerController as newPartnerCtrl', 
                templateUrl: 'views/newPartner.html'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html'
            })
            .otherwise({ redirectTo: '/' });
    }



    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
       
        $http.defaults.headers.common['X-CSRF-Token'] = $cookies.get('XSRF-TOKEN');
        
        
        // keep user logged in after page refresh
        $rootScope.globals = {};
        $rootScope.globals.cart = [];
        if($cookies.get('globals')){
            $rootScope.globals = $cookies.getObject('globals');
        };
        if ($cookies.get('cart')) {
            $rootScope.globals.cart = $cookies.getObject('cart');
        } else {
            $rootScope.globals.cart = [];
        };

        //$rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }        

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/signup']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            // if (restrictedPage && !loggedIn) {
            //     $location.path('/');
            // }
        });
    }

})();