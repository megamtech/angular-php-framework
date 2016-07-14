(function () {

    'use strict';

    angular
            .module('1grandtrunk')
            .controller('ScheduleController', ScheduleController);


    function ScheduleController($auth, $state, $interval) {
        $interval(function () {
            vm.refreshsession()
        }, 3000);
        console.log('Test');
        vm.refreshsession = function () {
            $http.get('/refreshsession')
                    .then(function (data) {
                        if (typeof data.data.token !== 'undefined') {
                            console.log(data.data);
                            // If login is successful, redirect to the users state
                            $auth.setToken(data.data.token);
                        } else {
                            $state.go('login', data.data);
                        }

                    });
        };
    }
});

