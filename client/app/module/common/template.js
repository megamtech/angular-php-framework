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
