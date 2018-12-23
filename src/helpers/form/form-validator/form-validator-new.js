import { objectMap } from '@/helpers/utils';
import { parseFormData, validate, applyFormData } from './helper';

export default class FormValidator {
  static createMixin() {
    return {
      computed: {
        formElement() {
          if (this.$el.nodeName && this.$el.nodeName === 'FORM') {
            return this.$el;
          }
          return this.$el.querySelector('form');
        },
      },
      methods: {
        onSubmit(event) {
          event.preventDefault();
          const res = this.validate();
          if (!res.errors) {
            this.onValidSubmit(res.data, this.formElement);
            this.$emit('success', res.data, this.formElement);
          }
        },
        onValidSubmit(data, form) {},
        validateField(name) {
          const res = validate(parseFormData(this.formElement), this.schema);
          const fieldError = res.errors ? res.errors[name] : null;
          this.errors = {
            ...this.errors,
            [name]: fieldError,
          };
          this.$emit('error', this.errors);
          this.$emit('fieldError', { name, error: fieldError });
        },
        validate() {
          const res = validate(parseFormData(this.formElement), this.schema);
          this.errors = res.errors || {};
          if (res.errors) {
            this.$emit('error', this.errors);
          }
          return res;
        },
        setData(formData) {
          applyFormData(this.formElement, formData);
        },
      },
      watch: {
        errors(newVal) {
          const $form = $(this.$el);
          $form.find('.invalid-feedback').remove();
          $form.find('.has-error').removeClass('has-error');
          $form.find('.is-invalid').removeClass('is-invalid');

          objectMap(newVal, (value, key) => {
            if (value) {
              const $control = $form.find(`[name="${key}"]`);
              if ($control.length) {
                $control.parent().addClass('has-error');
                $control.addClass('is-invalid');
                $control.after(`<div class="invalid-feedback">${value.map(message => `<span>${message}</span>`).join('')}</div>`);
              }
            }
          });
        },
      },
      data: () => {
        return {
          errors: {},
        };
      },
      mounted() {
        this.formElement.onsubmit = this.onSubmit.bind(this);
        const handler = (event) => {
          const { name, type } = event.target;
          if (name && !['checkbox', 'radio'].includes(type)) {
            this.validateField(name);
          }
        };
        $(this.$el).on('change', '.form-control, input', handler);
        this.unlisten = () => $(this.$el).off('change', '.form-control, input', handler);
      },
      beforeDestroy() {
        return this.unlisten && this.unlisten();
      },
    };
  }
}
