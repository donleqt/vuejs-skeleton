import { yup } from '@/helpers/form/form-validator';

export default function () {
  return {
    name: yup
      .string()
      .required()
      .label('First Name'),
    username: yup
      .string()
      .matches(/\w{0,100}/, 'Username is invalid')
      .required(),
    email: yup
      .string()
      .email()
      .required(),
    password: yup
      .string()
      .min(6)
      .required(),
  };
}
