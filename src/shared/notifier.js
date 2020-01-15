'use strict';

import toastr from 'toastr/build/toastr.min'

function setupDefaultOptions() {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
}

function error(message) {
    setupDefaultOptions();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 5000;
    toastr.options.extendedTimeOut = 0;
    toastr.error(message);
}

function errorPersistent(message) {
    setupDefaultOptions();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 0;
    toastr.options.extendedTimeOut = 0;
    toastr.error(message);
}

function info(message) {
    setupDefaultOptions();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 5000;
    toastr.options.extendedTimeOut = 0;
    toastr.info(message);
}

function success(message) {
    setupDefaultOptions();
    toastr.options.closeButton = false;
    toastr.options.timeOut = 3000;
    toastr.success(message);
}

function warning(message) {
    setupDefaultOptions();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 3000;
    toastr.options.extendedTimeOut = 0;
    toastr.warning(message);
}

export default {
    error: error,
    errorPersistent: errorPersistent,
    info: info,
    success: success,
    warning: warning
}
