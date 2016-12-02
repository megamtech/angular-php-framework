/*!
 megamframework 
 Copyright to :  
 Developed By :  Megam Technologies LLP(http://megamtech.com) 
 Created On : 2016-11-27 
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
                'angularMoment',
                'ngBootstrap',
                'ui.mask',
                'color.picker',
                'angucomplete-alt',
                'angularVerticalMenu'
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
                }).state('home', {
                    url: '/home',
                    templateUrl: 'module/users/home.html',
                    controller: 'UserController as vm',
                    data: {
                        requiredLogin: true,
                        title: "home"
                    }
                }).state('theme', {
                    url: '/theme',
                    abstract: true,
                    templateUrl: 'module/theme/index.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "buttons"
                    }
                }).state('theme.buttons', {
                    url: '/buttons',
                    name: 'buttons',
                    templateUrl: 'module/theme/buttons.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "buttons"
                    }
                }).state('theme.cards', {
                    url: '/cards',
                    name: 'cards',
                    templateUrl: 'module/theme/cards.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Cards"
                    }
                }).state('theme.widgets', {
                    url: '/widgets',
                    name: 'buttons',
                    templateUrl: 'module/theme/widgets.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "buttons"
                    }
                }).state('theme.alerts', {
                    url: '/alerts',
                    name: 'alerts',
                    templateUrl: 'module/theme/alerts.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Alerts"
                    }
                }).state('theme.navs', {
                    url: '/navs',
                    name: 'navs',
                    templateUrl: 'module/theme/navs.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Navs"
                    }
                }).state('theme.progress', {
                    url: '/progress',
                    name: 'progress',
                    templateUrl: 'module/theme/progress_bars.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Progress Bars"
                    }
                }).state('theme.modal', {
                    url: '/modal',
                    name: 'modal',
                    templateUrl: 'module/theme/modal.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Modal"
                    }
                }).state('theme.carousel', {
                    url: '/carousel',
                    name: 'carousel',
                    templateUrl: 'module/theme/carousel.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Carousel"
                    }
                }).state('theme.typography', {
                    url: '/typography',
                    name: 'typography',
                    templateUrl: 'module/theme/typography.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Typography"
                    }
                }).state('theme.grid', {
                    url: '/grid',
                    name: 'grid',
                    templateUrl: 'module/theme/grid.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Grid"
                    }
                }).state('theme.form-elements', {
                    url: '/form-elements',
                    name: 'form-elements',
                    templateUrl: 'module/theme/form_elements.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Form Element"
                    }
                }).state('theme.editors', {
                    url: '/editors',
                    name: 'editors',
                    templateUrl: 'module/theme/editors.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Editors"
                    }
                }).state('theme.form-pickers', {
                    url: '/form-pickers',
                    name: 'form-pickers',
                    templateUrl: 'module/theme/form_pickers.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Form Pickers"
                    }
                }).state('theme.mask', {
                    url: '/mask',
                    name: 'mask',
                    templateUrl: 'module/theme/mask.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Mask"
                    }
                }).state('theme.others', {
                    url: '/others',
                    name: 'others',
                    templateUrl: 'module/theme/others.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Others"
                    }
                }).state('theme.wizard', {
                    url: '/wizard',
                    name: 'wizard',
                    templateUrl: 'module/theme/wizard.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Wizard"
                    }
                }).state('theme.typeahead', {
                    url: '/typeahead',
                    name: 'typeahead',
                    templateUrl: 'module/theme/typeahead.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "Typeahead"
                    }
                }).state('theme.x_editable', {
                    url: '/x_editable',
                    name: 'x_editable',
                    templateUrl: 'module/theme/x_editable.html',
                    controller: 'ThemeController as vm',
                    data: {
                        requiredLogin: false,
                        title: "X-Editable"
                    }
                });
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
var url = 'http://127.0.0.1/api/';
(function () {
    'use strict';
    angular
            .module('megamapp').constant('API_URLs', {
        'register': url + 'register',
        'login': url + 'login',
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
            .module('megamapp').filter('formatdate', function ($filter, DataFormat) {
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
            .module('megamapp')
            .controller('TemplateController', TemplateController);
    function TemplateController(UIService, UserService, $state, $rootScope) {
        var vm = this;
        vm.appname = ' - MegamFrameWork';
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


(function () {
    'use strict';
    angular
            .module('megamapp')
            .controller('ThemeController', ['$scope',
                function ($scope) {
                    var vm = this;
                    $scope.countries = [
                        {name: 'Afghanistan', code: 'AF'},
                        {name: 'Aland Islands', code: 'AX'},
                        {name: 'Albania', code: 'AL'},
                        {name: 'Algeria', code: 'DZ'},
                        {name: 'American Samoa', code: 'AS'},
                        {name: 'AndorrA', code: 'AD'},
                        {name: 'Angola', code: 'AO'},
                        {name: 'Anguilla', code: 'AI'},
                        {name: 'Antarctica', code: 'AQ'},
                        {name: 'Antigua and Barbuda', code: 'AG'},
                        {name: 'Argentina', code: 'AR'},
                        {name: 'Armenia', code: 'AM'},
                        {name: 'Aruba', code: 'AW'},
                        {name: 'Australia', code: 'AU'},
                        {name: 'Austria', code: 'AT'},
                        {name: 'Azerbaijan', code: 'AZ'},
                        {name: 'Bahamas', code: 'BS'},
                        {name: 'Bahrain', code: 'BH'},
                        {name: 'Bangladesh', code: 'BD'},
                        {name: 'Barbados', code: 'BB'},
                        {name: 'Belarus', code: 'BY'},
                        {name: 'Belgium', code: 'BE'},
                        {name: 'Belize', code: 'BZ'},
                        {name: 'Benin', code: 'BJ'},
                        {name: 'Bermuda', code: 'BM'},
                        {name: 'Bhutan', code: 'BT'},
                        {name: 'Bolivia', code: 'BO'},
                        {name: 'Bosnia and Herzegovina', code: 'BA'},
                        {name: 'Botswana', code: 'BW'},
                        {name: 'Bouvet Island', code: 'BV'},
                        {name: 'Brazil', code: 'BR'},
                        {name: 'British Indian Ocean Territory', code: 'IO'},
                        {name: 'Brunei Darussalam', code: 'BN'},
                        {name: 'Bulgaria', code: 'BG'},
                        {name: 'Burkina Faso', code: 'BF'},
                        {name: 'Burundi', code: 'BI'},
                        {name: 'Cambodia', code: 'KH'},
                        {name: 'Cameroon', code: 'CM'},
                        {name: 'Canada', code: 'CA'},
                        {name: 'Cape Verde', code: 'CV'},
                        {name: 'Cayman Islands', code: 'KY'},
                        {name: 'Central African Republic', code: 'CF'},
                        {name: 'Chad', code: 'TD'},
                        {name: 'Chile', code: 'CL'},
                        {name: 'China', code: 'CN'},
                        {name: 'Christmas Island', code: 'CX'},
                        {name: 'Cocos (Keeling) Islands', code: 'CC'},
                        {name: 'Colombia', code: 'CO'},
                        {name: 'Comoros', code: 'KM'},
                        {name: 'Congo', code: 'CG'},
                        {name: 'Congo, The Democratic Republic of the', code: 'CD'},
                        {name: 'Cook Islands', code: 'CK'},
                        {name: 'Costa Rica', code: 'CR'},
                        {name: 'Cote D\'Ivoire', code: 'CI'},
                        {name: 'Croatia', code: 'HR'},
                        {name: 'Cuba', code: 'CU'},
                        {name: 'Cyprus', code: 'CY'},
                        {name: 'Czech Republic', code: 'CZ'},
                        {name: 'Denmark', code: 'DK'},
                        {name: 'Djibouti', code: 'DJ'},
                        {name: 'Dominica', code: 'DM'},
                        {name: 'Dominican Republic', code: 'DO'},
                        {name: 'Ecuador', code: 'EC'},
                        {name: 'Egypt', code: 'EG'},
                        {name: 'El Salvador', code: 'SV'},
                        {name: 'Equatorial Guinea', code: 'GQ'},
                        {name: 'Eritrea', code: 'ER'},
                        {name: 'Estonia', code: 'EE'},
                        {name: 'Ethiopia', code: 'ET'},
                        {name: 'Falkland Islands (Malvinas)', code: 'FK'},
                        {name: 'Faroe Islands', code: 'FO'},
                        {name: 'Fiji', code: 'FJ'},
                        {name: 'Finland', code: 'FI'},
                        {name: 'France', code: 'FR'},
                        {name: 'French Guiana', code: 'GF'},
                        {name: 'French Polynesia', code: 'PF'},
                        {name: 'French Southern Territories', code: 'TF'},
                        {name: 'Gabon', code: 'GA'},
                        {name: 'Gambia', code: 'GM'},
                        {name: 'Georgia', code: 'GE'},
                        {name: 'Germany', code: 'DE'},
                        {name: 'Ghana', code: 'GH'},
                        {name: 'Gibraltar', code: 'GI'},
                        {name: 'Greece', code: 'GR'},
                        {name: 'Greenland', code: 'GL'},
                        {name: 'Grenada', code: 'GD'},
                        {name: 'Guadeloupe', code: 'GP'},
                        {name: 'Guam', code: 'GU'},
                        {name: 'Guatemala', code: 'GT'},
                        {name: 'Guernsey', code: 'GG'},
                        {name: 'Guinea', code: 'GN'},
                        {name: 'Guinea-Bissau', code: 'GW'},
                        {name: 'Guyana', code: 'GY'},
                        {name: 'Haiti', code: 'HT'},
                        {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
                        {name: 'Holy See (Vatican City State)', code: 'VA'},
                        {name: 'Honduras', code: 'HN'},
                        {name: 'Hong Kong', code: 'HK'},
                        {name: 'Hungary', code: 'HU'},
                        {name: 'Iceland', code: 'IS'},
                        {name: 'India', code: 'IN'},
                        {name: 'Indonesia', code: 'ID'},
                        {name: 'Iran, Islamic Republic Of', code: 'IR'},
                        {name: 'Iraq', code: 'IQ'},
                        {name: 'Ireland', code: 'IE'},
                        {name: 'Isle of Man', code: 'IM'},
                        {name: 'Israel', code: 'IL'},
                        {name: 'Italy', code: 'IT'},
                        {name: 'Jamaica', code: 'JM'},
                        {name: 'Japan', code: 'JP'},
                        {name: 'Jersey', code: 'JE'},
                        {name: 'Jordan', code: 'JO'},
                        {name: 'Kazakhstan', code: 'KZ'},
                        {name: 'Kenya', code: 'KE'},
                        {name: 'Kiribati', code: 'KI'},
                        {name: 'Korea, Democratic People\'S Republic of', code: 'KP'},
                        {name: 'Korea, Republic of', code: 'KR'},
                        {name: 'Kuwait', code: 'KW'},
                        {name: 'Kyrgyzstan', code: 'KG'},
                        {name: 'Lao People\'S Democratic Republic', code: 'LA'},
                        {name: 'Latvia', code: 'LV'},
                        {name: 'Lebanon', code: 'LB'},
                        {name: 'Lesotho', code: 'LS'},
                        {name: 'Liberia', code: 'LR'},
                        {name: 'Libyan Arab Jamahiriya', code: 'LY'},
                        {name: 'Liechtenstein', code: 'LI'},
                        {name: 'Lithuania', code: 'LT'},
                        {name: 'Luxembourg', code: 'LU'},
                        {name: 'Macao', code: 'MO'},
                        {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
                        {name: 'Madagascar', code: 'MG'},
                        {name: 'Malawi', code: 'MW'},
                        {name: 'Malaysia', code: 'MY'},
                        {name: 'Maldives', code: 'MV'},
                        {name: 'Mali', code: 'ML'},
                        {name: 'Malta', code: 'MT'},
                        {name: 'Marshall Islands', code: 'MH'},
                        {name: 'Martinique', code: 'MQ'},
                        {name: 'Mauritania', code: 'MR'},
                        {name: 'Mauritius', code: 'MU'},
                        {name: 'Mayotte', code: 'YT'},
                        {name: 'Mexico', code: 'MX'},
                        {name: 'Micronesia, Federated States of', code: 'FM'},
                        {name: 'Moldova, Republic of', code: 'MD'},
                        {name: 'Monaco', code: 'MC'},
                        {name: 'Mongolia', code: 'MN'},
                        {name: 'Montserrat', code: 'MS'},
                        {name: 'Morocco', code: 'MA'},
                        {name: 'Mozambique', code: 'MZ'},
                        {name: 'Myanmar', code: 'MM'},
                        {name: 'Namibia', code: 'NA'},
                        {name: 'Nauru', code: 'NR'},
                        {name: 'Nepal', code: 'NP'},
                        {name: 'Netherlands', code: 'NL'},
                        {name: 'Netherlands Antilles', code: 'AN'},
                        {name: 'New Caledonia', code: 'NC'},
                        {name: 'New Zealand', code: 'NZ'},
                        {name: 'Nicaragua', code: 'NI'},
                        {name: 'Niger', code: 'NE'},
                        {name: 'Nigeria', code: 'NG'},
                        {name: 'Niue', code: 'NU'},
                        {name: 'Norfolk Island', code: 'NF'},
                        {name: 'Northern Mariana Islands', code: 'MP'},
                        {name: 'Norway', code: 'NO'},
                        {name: 'Oman', code: 'OM'},
                        {name: 'Pakistan', code: 'PK'},
                        {name: 'Palau', code: 'PW'},
                        {name: 'Palestinian Territory, Occupied', code: 'PS'},
                        {name: 'Panama', code: 'PA'},
                        {name: 'Papua New Guinea', code: 'PG'},
                        {name: 'Paraguay', code: 'PY'},
                        {name: 'Peru', code: 'PE'},
                        {name: 'Philippines', code: 'PH'},
                        {name: 'Pitcairn', code: 'PN'},
                        {name: 'Poland', code: 'PL'},
                        {name: 'Portugal', code: 'PT'},
                        {name: 'Puerto Rico', code: 'PR'},
                        {name: 'Qatar', code: 'QA'},
                        {name: 'Reunion', code: 'RE'},
                        {name: 'Romania', code: 'RO'},
                        {name: 'Russian Federation', code: 'RU'},
                        {name: 'RWANDA', code: 'RW'},
                        {name: 'Saint Helena', code: 'SH'},
                        {name: 'Saint Kitts and Nevis', code: 'KN'},
                        {name: 'Saint Lucia', code: 'LC'},
                        {name: 'Saint Pierre and Miquelon', code: 'PM'},
                        {name: 'Saint Vincent and the Grenadines', code: 'VC'},
                        {name: 'Samoa', code: 'WS'},
                        {name: 'San Marino', code: 'SM'},
                        {name: 'Sao Tome and Principe', code: 'ST'},
                        {name: 'Saudi Arabia', code: 'SA'},
                        {name: 'Senegal', code: 'SN'},
                        {name: 'Serbia and Montenegro', code: 'CS'},
                        {name: 'Seychelles', code: 'SC'},
                        {name: 'Sierra Leone', code: 'SL'},
                        {name: 'Singapore', code: 'SG'},
                        {name: 'Slovakia', code: 'SK'},
                        {name: 'Slovenia', code: 'SI'},
                        {name: 'Solomon Islands', code: 'SB'},
                        {name: 'Somalia', code: 'SO'},
                        {name: 'South Africa', code: 'ZA'},
                        {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
                        {name: 'Spain', code: 'ES'},
                        {name: 'Sri Lanka', code: 'LK'},
                        {name: 'Sudan', code: 'SD'},
                        {name: 'Suriname', code: 'SR'},
                        {name: 'Svalbard and Jan Mayen', code: 'SJ'},
                        {name: 'Swaziland', code: 'SZ'},
                        {name: 'Sweden', code: 'SE'},
                        {name: 'Switzerland', code: 'CH'},
                        {name: 'Syrian Arab Republic', code: 'SY'},
                        {name: 'Taiwan, Province of China', code: 'TW'},
                        {name: 'Tajikistan', code: 'TJ'},
                        {name: 'Tanzania, United Republic of', code: 'TZ'},
                        {name: 'Thailand', code: 'TH'},
                        {name: 'Timor-Leste', code: 'TL'},
                        {name: 'Togo', code: 'TG'},
                        {name: 'Tokelau', code: 'TK'},
                        {name: 'Tonga', code: 'TO'},
                        {name: 'Trinidad and Tobago', code: 'TT'},
                        {name: 'Tunisia', code: 'TN'},
                        {name: 'Turkey', code: 'TR'},
                        {name: 'Turkmenistan', code: 'TM'},
                        {name: 'Turks and Caicos Islands', code: 'TC'},
                        {name: 'Tuvalu', code: 'TV'},
                        {name: 'Uganda', code: 'UG'},
                        {name: 'Ukraine', code: 'UA'},
                        {name: 'United Arab Emirates', code: 'AE'},
                        {name: 'United Kingdom', code: 'GB'},
                        {name: 'United States', code: 'US'},
                        {name: 'United States Minor Outlying Islands', code: 'UM'},
                        {name: 'Uruguay', code: 'UY'},
                        {name: 'Uzbekistan', code: 'UZ'},
                        {name: 'Vanuatu', code: 'VU'},
                        {name: 'Venezuela', code: 'VE'},
                        {name: 'Vietnam', code: 'VN'},
                        {name: 'Virgin Islands, British', code: 'VG'},
                        {name: 'Virgin Islands, U.S.', code: 'VI'},
                        {name: 'Wallis and Futuna', code: 'WF'},
                        {name: 'Western Sahara', code: 'EH'},
                        {name: 'Yemen', code: 'YE'},
                        {name: 'Zambia', code: 'ZM'},
                        {name: 'Zimbabwe', code: 'ZW'}
                    ];
                    $scope.typeaheadSelected = function (selected) {
                        console.log(selected);
                    };
                    $scope.tabs = [
                        {title: 'Dynamic Title 1', content: 'Dynamic content 1'},
                        {title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true}
                    ];
                    $scope.alertMe = function () {
                        setTimeout(function () {
                            //$window.alert('You\'ve selected the alert tab!');
                        });
                    };
                    $scope.state = false;
                    $scope.toggleState = function () {
                        $scope.state = !$scope.state;
                    };
                    $scope.myconfig = {
                        "id": "http://jsonschema.net",
                        "type": "object",
                        "definitions": {
                            "label": {
                                "description": "Label of the menu item",
                                "type": "string",
                                "optional": false
                            },
                            "icon": {
                                "description": "Name of a Font Awesome icon",
                                "type": "string",
                                "optional": false
                            },
                            "href": {
                                "description": "Angular route path or url",
                                "type": "string",
                                "optional": false
                            },
                            "callback": {
                                "description": "Callback function called when the item is activated. The callback function receive the underlying item object as the first argument.",
                                "type": "string"
                            }
                        },
                        "properties": {
                            "default": {
                                "type": "object",
                                "properties": {
                                    "icon": {
                                        "$ref": "#/definitions/icon"
                                    }
                                }
                            },
                            "animation": {
                                "description": "Customization of the animation. If not defined default parameters duration(0.4) and timing(ease) are used.",
                                "type": "object",
                                "properties": {
                                    "duration": {
                                        "description": "Duration of the animation",
                                        "type": "number",
                                        "optional": false
                                    },
                                    "timing": {
                                        "description": "The timing function to use for the animation",
                                        "type": "string",
                                        "optional": false
                                    }
                                }
                            },
                            "data": {
                                "description": "Declare the structure of menu",
                                "type": "array",
                                "items": {
                                    "description": "First level menu item",
                                    "type": "object",
                                    "properties": {
                                        "label": {
                                            "$ref": "#/definitions/label"
                                        },
                                        "icon": {
                                            "$ref": "#/definitions/icon"
                                        },
                                        "badge": {
                                            "description": "A value to be displayed as a badge",
                                            "type": "string"
                                        },
                                        "children": {
                                            "description": "List of sub items",
                                            "type": "array",
                                            "items": {
                                                "description": "Second level item",
                                                "type": "object",
                                                "properties": {
                                                    "label": {
                                                        "$ref": "#/definitions/label"
                                                    },
                                                    "icon": {
                                                        "$ref": "#/definitions/icon"
                                                    },

                                                },
                                                "required": [
                                                    "label"
                                                ],
                                                "additionalProperties": false
                                            }
                                        }
                                    },
                                    "required": [
                                        "label"
                                    ],
                                    "additionalProperties": false
                                }
                            }
                        }
                    };
                }

            ]);

})();
angular.module('megamapp').directive('sidebarDirective', function () {
    return {
        link: function (scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function (newVal) {
                if (newVal)
                {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});
