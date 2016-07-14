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


