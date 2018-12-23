import { yup } from '@/helpers/form/form-validator';

export default function () {
  return {
    username: yup.string().required(),
    password: yup.string().required(),
  };
}