let toastr = null;

const defaultOptions = {
  preventDuplicates: true,
  closeButton: true,
  debug: false,
  positionClass: 'toast-bottom-right',
  onclick: null,
  showDuration: 100,
  hideDuration: 100,
  timeOut: 5000,
  extendedTimeOut: 3000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const importToastr = () => {
  return import(/* webpackChunkName: "toastr" */ './toastr').then((res) => {
    toastr = res.default;
    toastr.options = defaultOptions;
    return toastr;
  });
};

const toast = {
  info: (message, title, options) => {
    toastr.info(message, title || 'Info message', options);
  },
  success: (message, title, options) => {
    toastr.success(message, title || 'Success message', options);
  },
  error: (message, title, options) => {
    toastr.error(message, title || 'Error message', options);
  },
  warning: (message, title, options) => {
    toastr.warning(message, title || 'Notice', options);
  },
};

const lazyToast = new Proxy(toast, {
  get(target, name) {
    return async (...params) => {
      if (global.isClient) {
        await importToastr();
        return target[name].apply(null, params);
      }
      return true;
    };
  },
});

export default lazyToast;
