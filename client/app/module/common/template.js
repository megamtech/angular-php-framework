(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('TemplateController', TemplateController);
    function TemplateController(UIService, UserService, $state) {
        var vm = this;
        vm.appname = ' - 1GrandTrunk'

        vm.isUserAuthenticated = function () {
            if (UserService.isUserAuthenticated()) {
                return true;
            } else {
                return false;
            }


        };
        vm.getUserDetails = function () {
            return UserService.getUserDetails();

        }
        vm.getUserName = function () {
            return UserService.getUserFullName();
        }
        vm.getTitle = function () {
            if (angular.isDefined($state.$current.data))
                if (angular.isDefined($state.$current.data.title))
                    return $state.$current.data.title + vm.appname;

        };
    }
})();
