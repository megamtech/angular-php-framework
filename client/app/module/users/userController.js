// public/scripts/userController.js

(function () {

    'use strict';
    angular
            .module('megamframework')
            .controller('UserController', [
                '$http', 'API_URLs', 'ngToast', '$state', '$auth', 'UserService', 'UIService', 'NgTableParams', 'APIService',
                function ($http, API_URLs, ngToast, $state, $auth, UserService, UIService, NgTableParams, APIService) {

                    var vm = this;
                    vm.users;
                    vm.error;
                    vm.user_roles = [
                        //{id: 1, role: 'User'},
                        {id: 3, role: 'Admin'},
                        {id: 2, role: 'Manager'},
                    ];

                    vm.authenticate = function (provider) {
                        $auth.authenticate(provider);
                    };
                    
                    vm.getUsers = function () {
                        // This request will hit the index method in the AuthenticateController
                        $http.get(API_URLs.getusers).success(function (users) {
                            vm.users = users;
                        }).error(function (error) {
                            vm.error = error;
                        });
                    };
                    vm.login = function () {
                        UserService.login(vm.username, vm.password);
                    };
                    vm.logout = function () {
                        UserService.logout();
                    };
                    vm.resetPassword = function () {
                        APIService.post('resetpassword', '', {email: vm.username}).success(function (data) {
                            if (data.status_code == 1) {
                                UIService.notify('Password sent to your email', 'success');
                            } else {
                                UIService.notify(data.response.message, 'error');
                            }
                        });
                    };
                    vm.register = function () {

                        if (vm.users.password == vm.users.verify_password) {
                            $http.post(API_URLs['register'], vm.users).success(function (data) {
                                if (data.status_code == 1) {
                                    UIService.notify('User Registered Successfully!!!', 'success');

                                    $state.go('login');
                                } else {
                                    $.each(data.response, function (i, server_error_content) {
                                        ngToast.danger({
                                            content: server_error_content,
                                            dismissButton: true
                                        });
                                    });

                                }
                            }).error(function (error) {
                                ngToast.danger({
                                    content: 'Server Error Please try again !!!',
                                    dismissButton: true
                                });
                            });
                        } else {
                            ngToast.danger({
                                content: 'Password does not match',
                                dismissButton: true
                            });
                        }
                    };
                    vm.getUserName = function () {
                        $http.post(API_URLs['getusername'], vm._user.data).success(function (data) {
                            vm.username = data;
                        });
                    };
                    
})();

