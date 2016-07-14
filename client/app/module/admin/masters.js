(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('MasterController', MasterController);
    function MasterController($state, NgTableParams, APIService, UIService, UserService) {

        var vm = this;
        vm._masterdata = new Object();
        vm._masterselect = new Object();
        vm._mastername;
        vm._type;
        vm._id;

        vm.page_default_values = {
            "zones": {
                country: "India",
                status: 1
            },
            "country": {
                status: 1
            }

        }
        vm.static_values = {
            status: [
                {'id': '0', 'value': 'Disabled'},
                {'id': '1', 'value': 'Enabled'}
            ],
            coupon_type: [
                {'id': '1', 'value': 'Fixed'},
                {'id': '2', 'value': 'Percentage'}]
        };

        vm.initialize = function () {
            vm.status = vm.static_values.status[1].id;
            vm._mastername = $state.params.mastername;
            vm._type = $state.params.type;
            vm._id = $state.params.id;
            vm.loadDefaults();
        };
        vm.loadDefaults = function () {
            var defaults = vm.page_default_values[vm._mastername];
            $.each(defaults, function (i, j) {
                vm._masterdata[i] = j;
            });
        };

        vm.getLinkUrl = function (type, data) {
            if (data != '') {
                return  '#/master/' + vm._mastername + '/' + type + '/' + data;
            } else {
                return  '#/master/' + vm._mastername + '/' + type;
            }


        };


        vm.add = function () {


            APIService.post(vm._mastername, 'add', vm._masterdata).success(function () {
//                $state.go('#/master/' + vm._mastername + '/viewall');
                UIService.notify(vm._mastername + 'added Successfully', 'success');
            }).error(function () {
                UIService.notify(vm._mastername + 'fields has some error', 'error');
            });


        };
        vm.edit = function () {
            vm._masterdata['muid'] = vm._id;
            APIService.post(vm._mastername, 'edit', vm._masterdata).success(function (data) {
                $state.go('#/master/' + vm._mastername + '/viewall');
                UIService.notify(vm._mastername + 'Updated Successfully', 'success');
            }).error(function (data) {
                UIService.notify(vm._mastername + 'fields has some error', 'error');
            });
        };
        vm.delete = function (id) {

            APIService.post(vm._mastername, 'delete', {muid: id}).success(function (data) {
                $state.go('#/master/' + vm._mastername + '/viewall');
                UIService.notify(vm._mastername + 'Deleted Successfully', 'success');
            }).error(function (data) {
                UIService.notify(vm._mastername + 'fields has some error', 'error');
            });


        };
        vm.getmaster = function () {
            APIService.post(vm._mastername, 'view', {muid: vm._id}).success(function (data) {
                $.each(data[0], function (i, j) {
                    vm._masterdata[i] = j;
                });
            }).error(function (data) {
                UIService.notify(vm._mastername + 'Some error occurred', 'error');
            });


        };
        vm.getmasters = function () {
            APIService.post(vm._mastername, vm._type).success(function (data) {

                vm.cols = data.cols;
                vm.mastertableParams = new NgTableParams({
                    count: 100
                }, {
                    dataset: data.result,
                    counts: []
                });
            }).error(function (data) {
                UIService.notify(vm._mastername + 'Some error occurred', 'error');
            });

        };
        vm.getmasterdata = function (mastername, condition, value) {
            APIService.post(vm._mastername, 'data', filter_data).success(function (data) {
                vm._masterselect = data;
            }).error(function (data) {
                UIService.notify(vm._mastername + 'Some error occurred', 'error');
            });
        };

    }
})();

