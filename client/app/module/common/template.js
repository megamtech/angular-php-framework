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
