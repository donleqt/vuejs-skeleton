import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import './toast.scss';


const defaultOptions = {
  preventDuplicates: true,
  closeButton: true,
  debug: false,
  positionClass: 'toast-bottom-right',
  onclick: null,
  showDuration: 300,
  hideDuration: 500,
  timeOut: 5000,
  extendedTimeOut: 5000,
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

toastr.options = defaultOptions;

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

function demoToast() {
  const message = 'Please check the confirmed result!';
  ['success', 'info', 'error', 'warning'].forEach(e => toast[e](`${e.toCapitalize()}! ${message}`));
}

export default toast;
