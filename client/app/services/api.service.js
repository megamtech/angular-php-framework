angular.module('1grandtrunk').service('APIService', function ($auth, API_URLs, $http, UIService, $state, $sessionStorage, $q, Upload) {
    this.response = {};
    this.is_error = false;

    this.post = function (module, action, data) {
        var temp = {};
        var defer = $q.defer();
        var url = '';
        if (action !== '') {
            url = API_URLs[module][action];
        } else {
            url = API_URLs[module];
        }
        data = data ? data : {};
        this.is_error = false;
        if (url !== '') {

            return $http.post(url, data);


        }
        ;
        console.log(this.response);
        //console.log
        //  =
        // console.log(this.response.$apply());
        //this.response=defer.promise;
    };
    this.uploadPhoto = function (module, action, data) {
        var url = '';
        if (action !== '') {
            url = API_URLs[module][action];
        } else {
            url = API_URLs[module];
        }
        data = data ? data : {};

        return Upload.upload({
            url: url,
            data: data,
        });
    }
    this.get = function () {

    };
});