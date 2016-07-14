// public/scripts/userController.js

(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('UserController', [
                '$http', 'API_URLs', 'ngToast', '$state', '$auth', 'UserService', 'UIService', 'NgTableParams', 'APIService',
                function ($http, API_URLs, ngToast, $state, $auth, UserService, UIService, NgTableParams, APIService) {

                    var vm = this;
                    vm.users;
                    vm.error;
//                    vm.customerdetails = '';
                    // vm._user = $auth.getPayload();
                    vm.user_roles = [
                        //{id: 1, role: 'User'},
                        {id: 3, role: 'Admin'},
                        {id: 2, role: 'Manager'},
                        {id: 4, role: 'Purchase Manager'}
                    ];

                    vm.authenticate = function (provider) {
                        $auth.authenticate(provider);
                    };
                    vm.getWarehouses = function () {

                        APIService.post('warehouse', 'data', {}).success(function (warehouselocations) {
                            vm._warehouses = warehouselocations;
                        });
                        vm._user.fullname = UserService.getUserFullName();
                        vm._user.suite_id = UserService.getSuiteId();
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
                    vm.getcountry = function (mastername, condition, value) {
                        var filter_data = new Array();
                        filter_data['filter'] = condition;
                        $http.post(API_URLs['country']['data'], filter_data).success(function (masterdata) {
                            vm._masterselect = masterdata;
                        });
                    };
                    vm.getcountryzones = function () {
                        $http.post(API_URLs['country']['zonedata'], {filter: {"name": vm.users.country}}).success(function (masterdata) {
                            vm.zonedata = masterdata;
                        });
                    };
//                    vm.getUser = function () {
//                        var data = vm._user.data;
//                        $http.post(API_URLs ['getuser'], data).success(function (data) {
//                            vm.userlist = data;
//                        });
//                    };

//                    vm.getUserHistory = function () {
//                        APIService.post('history', 'gethistorybyuser', {filter: {muid: UserService.getUserId()}}).success(function (data) {
//                            vm.user_history_details = data.response;
//                        });
//                    };

                    vm.getUserData = function () {
                        APIService.post('assistedpurchases', 'getuserassistedpurchase', {"filter": {user_id: UserService.getUserId()}}).success(function (data) {

                            vm.cols_assistedPurchase = [{
                                    "field": "purchase_id",
                                    "title": "Purchase Id",
                                    "sortable": "purchase_id",
                                    "show": true
                                }, {
                                    "field": "product",
                                    "title": "Product",
                                    "sortable": "product",
                                    "show": true
                                }, {
                                    "field": "model",
                                    "title": "Model",
                                    "sortable": "model",
                                    "show": true
                                }, {
                                    "field": "color",
                                    "title": "Color",
                                    "sortable": "color",
                                    "show": true
                                }, {
                                    "field": "url",
                                    "title": "Url",
                                    "sortable": "url",
                                    "show": true
                                }, {
                                    "field": "purchase_value",
                                    "title": "Value",
                                    "sortable": "purchase_value",
                                    "show": true
                                }, {
                                    "field": "purchase_status_name",
                                    "title": "Status",
                                    "sortable": "purchase_status_name",
                                    "show": true
                                }, {
                                    "field": "created_at",
                                    "title": "Created Date",
                                    "sortable": "created_at",
                                    "show": true,
                                    "type": 'date'
                                }, {
                                    "field": "muid",
                                    "type": 'action',
                                    "title": "Action",
                                    "show": true
                                }
                            ];
                            vm.purchase = data.response;
                            vm.assistedPurchase = new NgTableParams({
                                count: 10,
                                sorting: {created_at: "desc"}
                            }, {
                                dataset: data.response,
                                counts: []

                            });

                        });
                        APIService.post('package', 'data', {"filter": {user_id: UserService.getUserId()}}).success(function (data) {
                            vm.cols_packages = [{
                                    "field": "package_id",
                                    "title": "Package Id",
                                    "sortable": "package_id",
                                    "show": true
                                }, {
                                    "field": "category",
                                    "title": "Category",
                                    "sortable": "category",
                                    "show": true
                                }, {
                                    "field": "product",
                                    "title": "Product",
                                    "sortable": "product",
                                    "show": true
                                }, {
                                    "field": "received_date",
                                    "title": "Received At",
                                    "sortable": "received_date",
                                    "type": "date",
                                    "show": true
                                }, {
                                    "field": "weight",
                                    "title": "Weight(lbs)",
                                    "sortable": "weight",
                                    "show": true
                                }, {
                                    "field": "package_status_name",
                                    "title": "Status",
                                    "sortable": "package_status_name",
                                    "show": true
                                }, {
                                    "field": "warehouse_name",
                                    "title": "Warehouse",
                                    "sortable": "warehouse_name",
                                    "show": true
                                }, {
                                    "field": "muid",
                                    "title": "Action",
                                    "show": true
                                }
                            ];
                            vm.userPackages = new NgTableParams({
                                count: 100,
                                sorting: {received_date: "desc"},
                            }, {
                                dataset: data.result,
                                counts: []

                            });
                        });
                        APIService.post('order', 'data', {"filter": {user_id: UserService.getUserId()}}).success(function (data) {
                            vm.cols = [{
                                    "field": "order_id",
                                    "title": "Order ID",
                                    "sortable": "order_id",
                                    "show": true
                                }, {
                                    "field": "shipping_carrier",
                                    "title": "Carrier",
                                    "sortable": "shipping_carrier",
                                    "show": true
                                }, {
                                    "field": "shipping_rate",
                                    "title": "Amount",
                                    "sortable": "shipping_rate",
                                    "show": true
                                }, {
                                    "field": "warehouse_name",
                                    "title": "Received At",
                                    "sortable": "warehouse_name",
                                    "type": "date",
                                    "show": true
                                }, {
                                    "field": "created_at",
                                    "title": "Created At",
                                    "sortable": "created_at",
                                    "type": "date",
                                    "show": true
                                }, {
                                    "field": "order_status_name",
                                    "title": "Status",
                                    "sortable": "order_status_name",
                                    "show": true
                                }, {
                                    "field": "muid",
                                    "title": "Action",
                                    "type": "action",
                                    "show": true
                                }
                            ];
                            vm.confirmedOrders = new NgTableParams({
                                count: 10
                            }, {
                                dataset: data.response,
                                counts: []

                            });
                        });
                    };

                    vm.getCustomerList = function () {
                        APIService.post('getuserlist', '', {"filter": {"role_id": 1}}).success(function (data) {
                            vm.cols = [{
                                    "field": "firstname",
                                    "title": "Name",
                                    "show": true
                                }, {
                                    "field": "email",
                                    "title": "Email",
                                    "show": true
                                }, {
                                    "field": "suite_id",
                                    "title": "Customer Id",
                                    "show": true
                                }, {
                                    "field": "date_added",
                                    "title": "Date Added",
                                    "type": "date",
                                    "show": true
                                }, {
                                    "field": "muid",
                                    "title": "Action",
                                    "show": true
                                }
                            ];
                            vm._users = data.result;
                            vm.Users = new NgTableParams({
                                count: 100
                            }, {
                                dataset: data.result,
                                counts: []

                            });
                        });
                    };

                    vm.formatDate = function () {

                    };

                    vm.loadCustomerDetails = function () {
                        APIService.post('getcustomerdetails', '', {filter: {muid: $state.params.id}}).success(function (data) {
//                            $state.go('getuserlist');
                            vm.customerdetails = data.response[0];
                        });
                    };

                    vm.addAdminUser = function () {
                        APIService.post('addadminuser', '', vm.user).success(function (data) {
                            $state.go('getadminlist');
                            return data;
                        });
                    };

                    vm.getAdminList = function () {
                        APIService.post('getuserlist', '', {"filter": {"role_id": [2, 3, 4]}}).success(function (data) {
                            vm.cols = [{
                                    "field": "firstname",
                                    "title": "First Name",
                                    "show": true
                                }, {
                                    "field": "email",
                                    "title": "Email",
                                    "show": true
                                }, {
                                    "field": "role_name",
                                    "title": "Role Type",
                                    "show": true
                                }, {
                                    "field": "date_added",
                                    "title": "Date Added",
                                    "type": "date",
                                    "show": true
                                }, {
                                    "field": "muid",
                                    "title": "Action",
                                    "show": true
                                }
                            ];
                            vm._users = data.result;
                            vm.Users = new NgTableParams({
                                count: 100
                            }, {
                                dataset: data.result,
                                counts: []

                            });
                        });
                    };

                    function userName(vm, row) {
                        return row['firstname'] + ' ' + row['lastname'];
                    }
                }
            ]);
})();

