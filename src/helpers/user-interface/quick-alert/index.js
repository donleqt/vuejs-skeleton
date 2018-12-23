import swal from 'sweetalert2/dist/sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import './assets/sweetalert.css';

const swalBoostrap = swal.mixin({
  confirmButtonClass: 'btn btn-primary mr-4 swal-btn',
  cancelButtonClass: 'btn btn-danger swal-btn',
  buttonsStyling: false,
});

const quickAlert = {
  confirm: (title = 'Are you sure?', text = '', { yes = 'Continue', no = 'Cancel', ...options } = {}) => {
    return swalBoostrap({
      title,
      text,
      type: options.type || 'warning',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: yes,
      cancelButtonText: no,
    }).then(result => result.value);
  },
  success: (title = 'Success!', text = '', options) => {
    return swalBoostrap({
      title,
      text,
      type: 'success',
    });
  },
  input: (title = 'Enter a value', {
    type = 'text', placeholder = 'Enter your email address', inputValue = '', ...options
  }) => {
    return swalBoostrap({
      title,
      input: type,
      inputValue,
      inputPlaceholder: placeholder,
      confirmButtonText: 'Save',
      inputAttributes: {
        required: true,
      },
    });
  },
};

// quickAlert.confirm().then((res) => {
// // do some thing
// });

export default quickAlert;

