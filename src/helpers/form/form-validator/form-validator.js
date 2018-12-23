import { generateFieldWatchers, validate } from './helper';

export default class FormValidator {
  static createMixin(schema) {
    return {
      methods: {
        onSubmit() {
          const res = this.validateForm();
          if (res) {
            this.onValidSubmit();
          }
        },
        onValidSubmit() {
          throw new Error('Please implement this method for your form!');
        },
        validateForm() {
          const data = this.form;
          const res = validate(data, this.schema);
          this.errors = res.errors || {};
          return !res.errors;
        },
        validateField(name) {
          const res = validate(this.form, this.schema);
          const fieldError = res.errors ? res.errors[name] : null;
          this.errors[name] = fieldError;
        },
      },
      watch: generateFieldWatchers(schema, 'form'),
      data: () => {
        return {
          schema: { ...schema },
          errors: {},
        };
      },
    };
  }
}

