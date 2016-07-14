// public/scripts/app.js

(function () {

    'use strict';
    var onegrandtrunk = angular
            .module('1grandtrunk', [
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
                    clientId: '1171362196219285'
                });

                $authProvider.google({
                    clientId: '12998775430-d8riikfqabq9rttotl5fp09t4as2b8bu.apps.googleusercontent.com'
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
                    controller: 'PackageController as vm',
                    data: {
                        requiredLogin: true,
                        permissions: {
                            only: ['superadmin', 'user'],
                            redirectTo: 'home',
                            title: 'home'
                        }

                    }
                }).state('admin_home', {
                    url: '/admin_home',
                    templateUrl: 'module/admin_home.html',
                    controller: 'UserController as vm',
                    data: {
                        requiredLogin: true,
                        permissions: {
                            only: ['user', 'admin', 'superadmin'],
                            redirectTo: 'home',
                            title: 'home'
                        }

                    }
                }).state('admin_dashboard', {
                    url: '/admin/dashboard',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/admin/dashboard.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'superadmin'],
                        title: "Admin Dashboard"
                    }
                }).state('user_home', {
                    url: '/user_home',
                    templateUrl: 'module/user_home.html',
                    controller: 'UserController as vm',
                    data: {
                        requiredLogin: true,
                        permissions: {
                            only: ['user'],
                            redirectTo: 'home',
                            title: "Home"
                        }

                    }
                }).state('settings', {
                    url: '/settings/{tabname}',
                    templateUrl: 'module/users/settings.html',
                    controller: 'UserSettingsController as vm',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'user', 'superadmin'],
                        title: "Setting"
                    }
                }).state('order_pay', {
                    url: '/order/pay/{order_id}',
                    templateUrl: 'module/orders/order_pay.html',
                    controller: 'OrderController as vm',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'user', 'superadmin'],
                        title: "Order Payment "
                    }
                }).state('register', {
                    url: '/register',
                    templateUrl: 'module/users/register.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['user'],
                        title: "Register"
                    }
                }).state('addaddress', {
                    url: '/addaddress',
                    templateUrl: 'module/users/address.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['user', 'admin', 'superadmin'],
                        title: "Add Address"
                    }
                }).state('reset_password', {
                    url: '/reset_password',
                    templateUrl: 'module/users/reset_password.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['user', 'admin', 'superadmin'],
                        title: "Reset Password "
                    }
                }).state('getuserlist', {
                    url: '/getuserslist',
                    templateUrl: 'module/admin/users_list.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['admin', 'superadmin'],
                        title: "User List"
                    }
                }).state('getuserhistory', {
                    url: '/getuserhistory',
                    templateUrl: 'module/users/history.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['user'],
                        title: "User History"
                    }
                }).state('getadminlist', {
                    url: '/getadminlist',
                    templateUrl: 'module/admin/admin_list.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['admin', 'superadmin'],
                        title: "Admin List"
                    }
                }).state('adduser', {
                    url: '/adduser',
                    templateUrl: 'module/admin/adduser.html',
                    controller: 'UserController as vm',
                    data: {permissions: ['admin', 'superadmin'],
                        title: "Add User"
                    }
                }).state('logout', {
                    url: '/:logout',
                    template: null,
                    controller: 'UserController as vm',
                    data: {requiredLogin: true,
                        permissions: ['user', 'admin', 'superadmin']}
                }).state('masterview', {
                    controller: 'MasterController as vm',
                    url: '/master/{mastername}/{type}',
                    templateUrl: function ($stateParams) {
                        return 'module/admin/' + $stateParams.mastername + '.html';
                    },
                    data: {requiredLogin: true,
                        permissions: ['admin', 'superadmin'],
                        title: "View"
                    }
                }).state('masteradd', {
                    url: '/master/{mastername}/{type}/{id}',
                    controller: 'MasterController as vm',
                    data: {permissions: ['admin', 'superadmin'],
                        title: "Add"
                    },
                    templateUrl: function ($stateParams) {
                        return 'module/admin/' + $stateParams.mastername + '.html';
                    }
                }).state('packagecreate', {
                    url: '/package/add',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/packages.html',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'superadmin'],
                        title: "create Package)"
                    }
                }).state('packageview', {
                    url: '/package/view/{id}',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/packages.html',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'superadmin', 'purchasemanager'],
                        title: "View Package"
                    }
                }).state('user_edit', {
                    url: '/user/edit/{id}',
                    controller: 'UserController as vm',
                    templateUrl: 'module/admin/user_edit.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'superadmin'],
                        title: "Edit Customer {id}"
                    }
                }).state('package_edit', {
                    url: '/packages/edit/{id}',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/package_edit.html',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'superadmin'],
                        title: "Edit Package {id}"
                    }
                }).state('package_view', {
                    url: '/packages/view/{id}',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/package_view.html',
                    data: {requiredLogin: true,
                        permissions: ['admin', 'superadmin', 'purchasemanager'],
                        title: "view Package {id}"
                    }
                }).state('packagelist', {
                    url: '/package/list',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/list.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'superadmin', 'purchasemanager'],
                        title: "Package List"
                    }
                }).state('confirm_and_pay', {
                    url: '/packages/confirm_and_pay',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/confirm_and_pay.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Confirm and Pay"
                    }
                }).state('redirect', {
                    url: '/packages/redirect_to_payment',
                    controller: 'PackageController as vm',
                    templateUrl: 'module/packages/redirect.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Confirm and Pay"
                    }
                }).state('asst_confirm_and_pay', {
                    url: '/packages/asst_confirm_and_pay/{id}',
                    controller: 'AssistedPurchasesController as vm',
                    templateUrl: 'module/packages/asst_confirm_and_pay.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Confirm and Pay"
                    }
                }).state('assisted_purchase', {
                    url: '/assisted_purchase/create',
                    controller: 'AssistedPurchasesController as vm',
                    templateUrl: 'module/packages/assisted_purchase.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Create Assisted Purchase"
                    }
                }).state('assistedpurchase_list', {
                    url: '/assisted_purchase/list',
                    controller: 'AssistedPurchasesController as vm',
                    templateUrl: 'module/packages/assistedpurchase_list.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin', 'purchasemanager'],
                        title: "Purchase List"
                    }
                }).state('purchase_view', {
                    url: '/assisted_purchase/purchase_view/{id}',
                    controller: 'AssistedPurchasesController as vm',
                    templateUrl: 'module/packages/purchase_view.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin', 'purchasemanager'],
                        title: "View Purchase"
                    }
                }).state('messageinbox', {
                    url: '/messages/{folder}',
                    controller: 'MessageController as vm',
                    templateUrl: 'module/appmail/messages.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin'],
                        title: "Inbox"
                    }
                }).state('messageview', {
                    url: '/messages/view/{id}',
                    controller: 'MessageController as vm',
                    templateUrl: 'module/appmail/message_view.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin'],
                        title: "Inbox"
                    }
                }).state('alerts', {
                    url: '/alerts/compose',
                    controller: 'AlertController as vm',
                    templateUrl: 'module/appmail/alerts.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin'],
                        title: "Compose Alert"
                    }
                }).state('alerts_list', {
                    url: '/alerts/list',
                    controller: 'AlertController as vm',
                    templateUrl: 'module/appmail/view_alerts.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Alert List"
                    }
                }).state('transactiondetails', {
                    url: '/payments/transaction/{id}',
                    controller: 'PaymentsController as vm',
                    templateUrl: 'module/payments/transaction.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['user'],
                        title: "Transactoin Details"
                    }
                }).state('messagecompose', {
                    url: '/message/compose',
                    controller: 'MessageController as vm',
                    templateUrl: 'module/appmail/compose.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin'],
                        title: "Inbox"
                    }
                }).state('messagecomposedraft', {
                    url: '/message/draft/{id}',
                    controller: 'MessageController as vm',
                    templateUrl: 'module/appmail/compose.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin'],
                        title: "Inbox"
                    }
                }).state('admin_orderlist', {
                    url: '/orders/list',
                    controller: 'OrderController as vm',
                    templateUrl: 'module/orders/list.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin', 'user'],
                        title: "Order List"
                    }
                }).state('view', {
                    url: '/orders/view/{id}',
                    controller: 'OrderController as vm',
                    templateUrl: 'module/orders/view.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin', 'user', 'purchasemanager'],
                        title: "View Order"
                    }
                }).state('alerts_create', {
                    url: '/alerts/create',
                    controller: 'MessageController as vm',
                    templateUrl: 'module/appmail/inbox.html',
                    data: {
                        requiredLogin: true,
                        permissions: ['admin', 'manager', 'superadmin', 'user'],
                        title: "Messages"
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
            .value('uiTinymceConfig', {
                inline: false,
                plugins: 'advlist autolink link image lists charmap print preview',
                skin: 'lightgray',
                theme: 'modern',
                baseUrl: 'bower_components/tinymce-dist',
                menubar: false,
                statusbar: false
            });
})();


