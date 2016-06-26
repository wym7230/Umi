(function () {
    'use strict';

    angular
        .module('umi')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$uibModalInstance', '$uibModal', 'ItemService'];
    function LoginController($location, AuthenticationService, FlashService, $uibModalInstance, $uibModal, ItemService) {
        var loginCtrl = this;

        loginCtrl.login = login;
        loginCtrl.switchToSignup = switchToSignup;

        function login() {
            AuthenticationService.Login(loginCtrl.username, loginCtrl.password, function (response) {
                if (response.status == 0) {
                    AuthenticationService.SetCredentials(loginCtrl.username, loginCtrl.password);
                    $uibModalInstance.dismiss('cancel');
                    ItemService.getCart();
                } else if (response.status == 1) {
                    loginCtrl.error = "Your E-mail or Password is wrong. Please try again.";
                } else if (response.status == 2) {
                    loginCtrl.error = "Invalid input. Please try again";
                } else {
                    loginCtrl.error = "Log in faild. Please try again";
                    FlashService.Error(response.status);
                }
            });
        };

        function switchToSignup() {
            $uibModalInstance.dismiss('cancel');
            $uibModal.open({
                animation: true,
                templateUrl: '../../views/signupModal.html',
                controller: 'SignupController as signupCtrl'
            });
        }
    }

})();