import * as yup from 'yup';

/* eslint-disable no-template-curly-in-string */
/**
 * See https://github.com/jquense/yup for validate api
 */

yup.addMethod(yup.mixed, 'sameAs', function sameAs(ref, refName, message) {
  return this.test({
    name: 'sameAs',
    message: message || '${path} must be the same as ${reference}',
    params: {
      reference: refName || ref,
    },
    test(value) {
      const other = this.resolve(yup.ref(ref));
      return !other || !value || value === other;
    },
  });
});

yup.common = {
  dateFormat: message => yup.string().matches(/[\d]+4-[\d]+2-[\d]+2/, message || 'Date must have format of YYYY-MM-DD'),
  checkbox: () => yup.number().transform(value => (value ? 1 : 0)),
  integer: (message = '${path} must be a integer number') =>
    yup
      .number()
      .typeError(message)
      .integer()
      .transform(v => (isNaN(v) ? undefined : v)),
  number: (message = '${path} is not valid') =>
    yup
      .number()
      .typeError(message)
      .integer()
      .transform(v => (isNaN(v) || v < 0 ? null : v)),
  string: (message = '${path} is a required field') =>
    yup
      .string()
      .typeError(message)
      .transform(value => (value.trim() ? value : null)),
};

export default yup;
