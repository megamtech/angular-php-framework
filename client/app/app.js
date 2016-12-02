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


