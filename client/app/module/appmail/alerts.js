(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('AlertController', AlertController);
    function AlertController(APIService, $state, NgTableParams, UIService, UserService, $scope, $rootScope) {
        var vm = this;
        $rootScope.alerts = {};
        vm.loadAddresses = function () {
            return [
                {"muid": "1", email: "balajiv@megamtech.com"},
                {"muid": "2", email: "bala@megamtech.com"},
                {"muid": "3", email: "balajicse90@megamtech.com"}
            ];
        };

        vm.sendAlerts = function () {
            APIService.post('alerts', 'send', {to: vm.to, alert: vm.alert, desc: vm.desc, alert_severity: vm.alert_severity}).success(function (data) {
                if (data.status_code == 1) {
                    UIService.notify(data.response[0], 'success');
                    $state.go('alerts_list');
                }
            });
        };

        vm.getUserAlerts = function (by_me) {
            APIService.post('alerts', 'getuseralerts', {mark_as_read: true, by_me: by_me}).success(function (data) {
                vm.alerts = data.response;
                $rootScope.alerts.count = 0;
            });
        };
        vm.getRecentUnreadAlerts = function (count) {
            APIService.post('alerts', 'getuseralerts', {is_read: 'false', count: count}).success(function (data) {
                $rootScope.alerts.data = data.response;
                $rootScope.alerts.count = data.response.length;
            }).error(function () {

            });
        };
    }
})();