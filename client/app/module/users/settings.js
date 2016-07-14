(function () {

    'use strict';
    angular
            .module('1grandtrunk')
            .controller('UserSettingsController', UserSettingsController);
    function UserSettingsController(APIService, $state, UserService, UIService, $rootScope) {
        var vm = this;
        vm._user = {};
        vm.addAddressDialog = '';
        vm.changePasswordDialog = '';
        vm.initalize = function () {
            vm._tablist = {
                "profile": {
                    display_name: "My Profile",
                    url: "module/users/membership.html"
                }
            };
            if (UserService.getUserRole() === 1) {
                vm._tablist['my_addresses'] = {
                    display_name: "My Addresses",
                    url: "module/users/address_list.html"

                }
            }
        };
        vm.checkIsDefault = function (address) {
            if (address.is_default == true) {
                vm.is_default_address == address.address_id
            }
        }
        vm.getUserAddresses = function () {
            APIService.post('getuseraddresses', '', {muid: UserService.getUserId()}).success(function (deliveryaddresses) {
                vm._user.addresses = deliveryaddresses;
            });
        };

        vm.deleteAddress = function () {
            APIService.post('deleteuseraddress', '', {"address_id": vm.selected_address_id}).success(function (data) {
                if (data.status_code === 1) {
                    UIService.notify('Address Deleted successfully!!!', 'success');
                    $state.go($state.current, {}, {reload: true});
                } else {
                    UIService.notify('Some error occured!!!', 'error');
                }

            });
        };
        vm.cloneAddress = function () {
            var current_address = vm._user.addresses[vm.selected_address_id];
            vm.users = {
                first_name: current_address.firstname,
                last_name: current_address.lastname,
                address: current_address.street1,
                city: current_address.city,
                state: current_address.state,
                country: current_address.country,
                zip: current_address.zip,
                phone: current_address.phone
            };

            vm.showAddAddressesDialog(true);
        };

        vm.saveDefaultAddress = function () {
            APIService.post('savedefaultaddress', '', {"address_id": vm.selected_address_id}).success(function (data) {
                if (data.status_code === 1) {
                    UIService.notify('Default Address saved!!!', 'success');
                    $state.go($state.current, {}, {reload: true});
                } else {
                    UIService.notify('Some error occured!!!', 'error');
                }

            });

        };
        vm.showAddAddressesDialog = function (clone_address) {
            if (clone_address == true) {
                $rootScope.current_dialog_user = vm.users;
            } else {
                $rootScope.current_dialog_user = {};
            }
            UIService.createModalDialog('module/users/addaddressdialog.html', 'UserSettingsController as vm', 'lg');

        };


        vm.getUserRole = function () {
            UserService.getUserRole();
        };
        vm.getUserInfo = function () {
            vm._user.fullname = UserService.getUserFullName();
            vm._user.suite_id = UserService.getSuiteId();
            vm._user.username = UserService.getUserName();
            vm.getPreferences();
            vm.getCarriers();
        };
        vm.getWarehouses = function () {

            APIService.post('warehouse', 'data', {}).success(function (warehouselocations) {
                vm._warehouses = warehouselocations;
            });
            vm._user.fullname = UserService.getUserFullName();
            vm._user.suite_id = UserService.getSuiteId();
        };
        vm.savePreferences = function () {
            vm._preferences['muid'] = UserService.getUserId();
            vm._preferences.photo_status = vm._preferences.photo_status === true ? vm._preferences.photo_status : 0;
            vm._preferences.discard_boxes_status = vm._preferences.discard_boxes_status === true ? vm._preferences.discard_boxes_status : 0;
            APIService.post('savepreferences', '', vm._preferences).success(function (data) {
                if (data.status_code === 1) {
                    UIService.notify('Preferences Saved Sucessfully!!!', 'success');
                } else {
                    UIService.notify('Please check field error!!!', 'error');
                }
            });
        };
        vm.getCarriers = function () {
            APIService.post('carrier', 'data', {}).success(function (data) {
                if (data.status_code === 1) {
                    vm.shipping_carriers = data.response;
                } else {
                    UIService.notify('Loading Carrier data failed', 'error');
                }
            });
        };
        vm.getPreferences = function () {
            APIService.post('getpreferences', '', {'muid': UserService.getUserId()}).success(function (data) {
                if (data.status_code === 1) {
                    vm._preferences = {};
                    vm._preferences.photo_status = data.response.photo_status;
                    vm._preferences.discard_boxes_status = data.response.discard_boxes_status;
                    vm._preferences.shipping_carrier = data.response.shipping_carrier;
                } else {
                    UIService.notify('Some error Occured', 'error');
                }
            });
        }
        vm.addAddress = function () {
            vm.users['muid'] = UserService.getUserId();
            $state.go('settings', {}, {reload: true});

            APIService.post('addaddress', '', vm.users).success(function (data) {
                vm._user.addresses = data.response.addresses;
                UIService.notify('Address Saved Successfully', 'success');
                UIService.closeModal();
                $state.go($state.current, {}, {reload: true});
            });

        };
        vm.cancelAddAddressesDialog = function () {
            UIService.closeModal();
            $state.go($state.current, {}, {reload: true});
        };
        vm.showchangePasswordDialog = function () {
            UIService.createModalDialog('module/users/change_password.html', 'UserSettingsController as vm', 'lg');
        };
        vm.changeUserNameDialog = function () {
            UIService.createModalDialog('module/users/change_user_name.html', 'UserSettingsController as vm', 'lg');
        };
        vm.changeUserName = function () {
            APIService.post('changeusername', '', vm._user).success(function (data) {
                $auth.removeToken();
                $auth.setToken(data);
            });
        };
        vm.saveChangePassword = function () {
            vm.user['muid'] = UserService.getUserId();
            APIService.post('changepassword', '', vm.user).success(function (data) {
                vm.result = data;
                UIService.notify('Password Changed Successfully', 'success');
                UIService.closeModal();
            });
        };
        vm.copyData = function () {
            vm.users = $rootScope.current_dialog_user;
            vm.getcountryzones();
        }
        vm.getcountry = function (mastername, condition, value) {
            var filter_data = new Array();
            filter_data['filter'] = condition;
            APIService.post('country', 'data', filter_data).success(function (masterdata) {
                vm._masterselect = masterdata;
            });
        };
        vm.getcountryzones = function () {
            APIService.post('country', 'zonedata', {filter: {"name": vm.users.country}}).success(function (masterdata) {
                vm.zonedata = masterdata;
            });
        };
        /* $scope.$watch('[vm._packages]', function (packages) {
         console.log(packages);
         angular.forEach(packages, function (index, current_package) {
         console.log(current_package);
         vm.total_package['weight'] += current_package['weight'];
         });

         }, true);*/
    }
})();