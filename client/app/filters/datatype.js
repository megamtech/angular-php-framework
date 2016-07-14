(function () {

    'use strict';
    angular
            .module('1grandtrunk').filter('formatdate', function ($filter, DataFormat) {
        return function (input, format, timezone) {
            if (format !== '') {
                format = DataFormat.date[format];
            } else {
                format = DataFormat.date['medium'];
            }
            if (!timezone) {
                timezone = '';
            }

            return $filter('date')(input, format, timezone);
        };
    })
})();