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
