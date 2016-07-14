angular.module('1grandtrunk').service('UIService', function (ngToast, $uibModal, $uibModalStack) {
    var service = this;
    service.currentModal = '';
    service.notify = function (content, type, dismiss, dismissOnTimeout, timeout) {
        dismiss = dismiss ? dismiss : true;
        var notify_types = {'error': 'danger', 'warn': 'warning', 'info': 'info', 'success': 'success'};
        dismissOnTimeout = dismissOnTimeout ? dismissOnTimeout : true;


        timeout = timeout ? timeout : 4000;
        ngToast.create({
            className: notify_types[type],
            content: ' <strong>' + type + ' ! </strong> ' + content,
            dismissButton: dismiss,
            dismissOnTimeout: dismissOnTimeout,
            timeout: timeout,
            compileContent: true
        });
    };
    service.notifyFieldErrors = function (errorArray) {

        angular.forEach(errorArray, function (value) {
            console.log(value);
            if (angular.isArray(value) === true) {
                service.notifyFieldErrors(value);
            } else {
                service.notify(value, 'error');
            }

        });
    };
    service.createModalDialog = function (templateurl, controller, size, data) {

        size = size ? size : 'sm';
        data = data ? data : {};
        a : {
        }
        ;
        return service.currentModal = $uibModal.open({
            animation: true,
            templateUrl: templateurl,
            controller: controller,
            size: 'lg'
        });
    };
    service.closeModal = function () {
        return $uibModalStack.dismissAll('cancel');
    };
});