/*!
 megamframework 
 Copyright to :  
 Developed By :  Megam Technologies LLP(http://megamtech.com) 
 Created On : 2016-11-01 
 */
// public/scripts/app.js

(function () {

    'use strict';
    var megamapp = angular
            .module('megamapp', [
                'ui.router',
                'satellizer',
                'permission',
                'ngTable',
                'ngSanitize',
//                'gridshore.c3js.chart',
                'ngAnimate',
                'ui.bootstrap',
                'angular-loading-bar',
//                'ui.select',
                'ngToast',
                'uiSwitch',
                'ngStorage',
                'ngFileUpload',
//                'ui.tinymce',
                'ngTagsInput',
                'textAngular',
                'jcs-autoValidate',
                'angularMoment'

            ])
            .config(function ($stateProvider, $urlRouterProvider, $authProvider, API_URLs) {
                // Satellizer configuration that specifies which API
                // route the JWT should be retrieved from
                $authProvider.loginUrl = API_URLs.login;
                // Redirect to the auth state if any other states
                // are requested other than users

                $authProvider.facebook({
                    clientId: ''
                });

                $authProvider.google({
                    clientId: ''
                });
// Facebook
                $authProvider.facebook({
                    name: 'facebook',
                    url: '/auth/facebook',
                    authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                    redirectUri: window.location.origin + '/',
                    requiredUrlParams: ['display', 'scope'],
                    scope: ['email'],
                    scopeDelimiter: ',',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: {width: 580, height: 400}
                });

// Google
                $authProvider.google({
                    url: '/auth/google',
                    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                    redirectUri: window.location.origin,
                    requiredUrlParams: ['scope'],
                    optionalUrlParams: ['display'],
                    scope: ['profile', 'email'],
                    scopePrefix: 'openid',
                    scopeDelimiter: ' ',
                    display: 'popup',
                    type: '2.0',
                    popupOptions: {width: 452, height: 633}
                });
                $stateProvider.state('login', {
                    url: '/login',
                    templateUrl: 'module/users/login.html',
                    controller: 'UserController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Login"
                    },
                    resolve: {
                        skipIfLoggedIn: skipIfLoggedIn
                    }
                })
                        ;
                $urlRouterProvider.otherwise('/login');
                function skipIfLoggedIn($q, $auth) {
                    var deferred = $q.defer();
                    if ($auth.isAuthenticated()) {
                        deferred.reject();
                    } else {
                        deferred.resolve();
                    }
                    return deferred.promise;
                }
            })
            .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
                    cfpLoadingBarProvider.includeSpinner = true;
                    cfpLoadingBarProvider.includeBar = true;
                }])
            .run(function ($rootScope, $state, $auth, PermissionStore) {

                $rootScope.$on('$stateChangeStart',
                        function (event, toState) {

                            var requiredLogin = false;
                            // check if this state need login
                            if (toState.data && toState.data.requiredLogin)
                                requiredLogin = toState.data.requiredLogin;
                            // if yes and if this user is not logged in, redirect him to login page
                            if (requiredLogin === true && !$auth.isAuthenticated()) {
                                event.preventDefault();
                                $state.go('login');
                            }
                        });
                PermissionStore.definePermission('user', function ($stateParams) {

                    var userDetails = $auth.getPayload()['data'];
                    if (parseInt(userDetails.role_id) === 1) {
                        return true;
                    }
                    return false;
                });

                PermissionStore.definePermission('manager', function ($stateParams) {

                    var userDetails = $auth.getPayload()['data'];
                    if (parseInt(userDetails.role_id) === 2) {
                        return true;
                    }
                    return false;
                });
                PermissionStore.definePermission('admin', function ($stateParams) {

                    var userDetails = $auth.getPayload()['data'];
                    if (parseInt(userDetails.role_id) == 3) {
                        return true;
                    }
                    return false;
                });
                PermissionStore.definePermission('purchasemanager', function ($stateParams) {

                    var userDetails = $auth.getPayload()['data'];
                    if (parseInt(userDetails.role_id) == 4) {
                        return true;
                    }
                    return false;
                });
                PermissionStore.definePermission('superadmin', function ($stateParams) {

                    var userDetails = $auth.getPayload()['data'];
                    if (userDetails.role_id === -1 && userDetails.is_admin === true) {
                        return true;
                    }
                    return false;
                });
            }).run([
        'bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
            bootstrap3ElementModifier.enableValidationStateIcons(false);
        }])
            .directive('ngConfirmClick', [
                function () {
                    return {
                        link: function (scope, element, attr) {
                            var msg = attr.ngConfirmClick || "Are you sure?";
                            var clickAction = attr.confirmedClick;
                            element.bind('click', function (event) {
                                if (window.confirm(msg)) {
                                    scope.$eval(clickAction);
                                }
                            });
                        }
                    };
                }]).config(['ngToastProvider', function (ngToastProvider) {
            ngToastProvider.configure({
                animation: 'fade', // or 'slide'
                maxNumber: 3,
                combineDuplications: true
            });
        }]).directive('confirmPassword', function (defaultErrorMessageResolver) {
        defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
            errorMessages['confirmPassword'] = 'Please ensure the passwords match.';
        });

        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                confirmPassword: '=confirmPassword'
            },
            link: function (scope, element, attributes, ngModel) {
                ngModel.$validators.confirmPassword = function (modelValue) {
                    return modelValue === scope.confirmPassword;
                };

                scope.$watch('confirmPassword', function () {
                    ngModel.$validate();
                });
            }
        };
    }).directive('myModal', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                scope.dismiss = function () {
                    element.modal('hide');
                };
            }
        };
    })

})();



/**
url pattern : [[module_name]]:{
	[[action_type]]:[[API Signature of API / URL]]
}
*/
var url = 'http://127.0.0.1/api/server/';
(function () {
    'use strict';
    angular
            .module('megamapp').constant('API_URLs', {
        
        "module_name": {
            "add": url + 'master/add',
        }

    }).constant('DataFormat', {
        'date': {
            'medium': 'd MMM yyyy hh:mm a',
            'year': 'yyyy',
            'month': 'yyyy',
            'day': 'yyyy',
            'short': 'd MMM, yyyy',
            'datetime': 'yyyy',
            'datetimezone': 'yyyy',
            'long': 'yyyy',
            'longdatewithtime': 'EEEE, MMMM d, y hh:mm a'
        }
    });
})();

angular.module('megamapp').service('APIService', function ($auth, API_URLs, $http, UIService, $state, $sessionStorage, $q, Upload) {
    this.response = {};
    this.is_error = false;

    this.post = function (module, action, data) {
        var temp = {};
        var defer = $q.defer();
        var url = '';
        if (action !== '') {
            url = API_URLs[module][action];
        } else {
            url = API_URLs[module];
        }
        data = data ? data : {};
        this.is_error = false;
        if (url !== '') {

            return $http.post(url, data);


        }
        ;
        console.log(this.response);
        //console.log
        //  =
        // console.log(this.response.$apply());
        //this.response=defer.promise;
    };
    this.uploadPhoto = function (module, action, data) {
        var url = '';
        if (action !== '') {
            url = API_URLs[module][action];
        } else {
            url = API_URLs[module];
        }
        data = data ? data : {};

        return Upload.upload({
            url: url,
            data: data,
        });
    }
    this.get = function () {

    };
});
(function () {

    'use strict';

    angular
            .module('megamapp')
            .controller('ScheduleController', ScheduleController);


    function ScheduleController($auth, $state, $interval) {
        $interval(function () {
            vm.refreshsession()
        }, 3000);
        console.log('Test');
        vm.refreshsession = function () {
            $http.get('/refreshsession')
                    .then(function (data) {
                        if (typeof data.data.token !== 'undefined') {
                            console.log(data.data);
                            // If login is successful, redirect to the users state
                            $auth.setToken(data.data.token);
                        } else {
                            $state.go('login', data.data);
                        }

                    });
        };
    }
});


angular.module('megamapp').service('UIService', function (ngToast, $uibModal, $uibModalStack) {
    var service = this;
    service.currentModal = '';
    service.notify = function (content, type, dismiss, dismissOnTimeout, timeout) {
        dismiss = dismiss ? dismiss : true;
        var notify_types = {'error': 'danger', 'warn': 'warning', 'info': 'info', 'success': 'success'};
        dismissOnTimeout = dismissOnTimeout ? dismissOnTimeout : true;


        timeout = timeout ? timeout : 4000;
        ngToast.create({
            className: notify_types[type],
            content: ' <strong>' + type + ' ! </strong> ' + content,
            dismissButton: dismiss,
            dismissOnTimeout: dismissOnTimeout,
            timeout: timeout,
            compileContent: true
        });
    };
    service.notifyFieldErrors = function (errorArray) {

        angular.forEach(errorArray, function (value) {
            console.log(value);
            if (angular.isArray(value) === true) {
                service.notifyFieldErrors(value);
            } else {
                service.notify(value, 'error');
            }

        });
    };
    service.createModalDialog = function (templateurl, controller, size, data) {

        size = size ? size : 'sm';
        data = data ? data : {};
        a : {
        }
        ;
        return service.currentModal = $uibModal.open({
            animation: true,
            templateUrl: templateurl,
            controller: controller,
            size: 'lg'
        });
    };
    service.closeModal = function () {
        return $uibModalStack.dismissAll('cancel');
    };
});
angular.module('megamapp').service('UserService', function ($auth, UIService, $state, $location) {

    var vm = this;
    vm._user = {};
    this.login = function (username, password) {
        // Use Satellizer's $auth service to login
        $auth.login({username: username, password: password}).then(function (data) {
            //data
            $auth.setToken(data);
            // If login is successful, redirect to the users state
            if ($auth.isAuthenticated() === true) {
                vm.getUserDetails();
                if (vm.getUserRole() == 1) {
                    $state.go('home', {}, {reload: true});

                } else {
                    $state.go('packagelist', {}, {reload: true});
                }
            } else {
                $state.go('home', {});
                UIService.notify('Invalid Login Credencials!!!', 'error');
            }
        });
    };
    this.getUserDetails = function () {
        var userDetails = $auth.getPayload();
        if (angular.isUndefined(userDetails) == false) {
            vm._user = userDetails.data;
        } else {
            return false;
        }
    }
    this.getUserId = function () {
        return vm._user.muid;
    }
    this.getUserFullName = function () {
        this.getUserDetails();
        return vm._user.firstname + ' ' + vm._user.lastname;
    }
    this.getUserName = function () {
        this.getUserDetails();
        return vm._user.username;
    }
    this.getSuiteId = function () {
        this.getUserDetails();
        return vm._user.suite_id;
    }
    this.getUserRole = function () {
        return vm._user.role_id;
    }
    this.isUserAuthenticated = function () {

        var isuserActive = $auth.isAuthenticated();
        if (isuserActive) {
            this.getUserDetails();

        } else {
            $auth.logout();
        }
        return isuserActive;
    }
    this.logout = function () {
        $auth.logout()
                .then(function () {
                    vm._user = {};
                    UIService.notify('You have been logged out', 'info');
                    $state.go('login');
                });
    }
});

(function () {

    'use strict';
    angular
            .module('1grandtrunk').filter('formatdate', function ($filter, DataFormat) {
        return function (input, format, timezone) {
            if (format !== '') {
                format = DataFormat.date[format];
            } else {
                format = DataFormat.date['medium'];
            }
            if (!timezone) {
                timezone = '';
            }

            return $filter('date')(input, format, timezone);
        };
    }).filter('formaturl', function ($filter) {
        return function (urlstring) {
            var formatted_url = urlstring.trim();
            return formatted_url;
        };

    });
})();
(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('TemplateController', TemplateController);
    function TemplateController(UIService, UserService, $state, $rootScope, APIService, $window, $cookies) {
        var vm = this;
        vm.appname = ' - 1GrandTrunk';
        $rootScope.helpstartstep = 0;
        vm.isUserAuthenticated = function () {
            if (UserService.isUserAuthenticated()) {
                return true;
            } else {
                return false;
            }


        };
        vm.getUserDetails = function () {
            return UserService.getUserDetails();
        };
        vm.getUserName = function () {
            return UserService.getUserFullName();
        };
        vm.getTitle = function () {
            if (angular.isDefined($state.$current.data))
                if (angular.isDefined($state.$current.data.title))
                    return $state.$current.data.title + vm.appname;
        };
        vm.updateHelp = function (show_guide) {
            $cookies.put('show_guide', show_guide);
            if (show_guide == true) {
                $window.location.reload();
            }
            APIService.post('userguide', '', {show_guide: show_guide}).success(function (data) {

            });
        };
        vm.showHelpGuide = function () {
            return $cookies.get('show_guide');
        };
    }
})();

// public/scripts/userController.js

(function () {

    'use strict';
    angular
            .module('megamapp')
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

