/**
 url pattern : [[module_name]]:{
 [[action_type]]:[[API Signature of API / URL]]
 }
 */
var url = 'http://127.0.0.1/api/server/';
(function () {
    'use strict';
    angular
            .module('megamapp').constant('API_URLs', {
        'register': url + 'register',
        'login': url + 'login',
        "module_name": {
            "add": url + 'master/add',
        }
    }).constant('DataFormat', {
        'date': {
            'medium': 'd MMM yyyy hh:mm a',
            'year': 'yyyy',
            'month': 'yyyy',
            'day': 'yyyy',
            'short': 'd MMM, yyyy',
            'datetime': 'yyyy',
            'datetimezone': 'yyyy',
            'long': 'yyyy',
            'longdatewithtime': 'EEEE, MMMM d, y hh:mm a'
        }
    });
})();
