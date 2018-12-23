/* eslint-disable */
// just testing, incomplete
const mixed = {
  default: '${path} est invalide',
  required: '${path} est un champ obligatoire',
  oneOf: '${path} doit être l\'une des valeurs suivantes: ${values}',
  notOneOf: '${path} must not be one of the following values: ${values}',
};

const string = {
  length: '${path} must be exactly ${length} characters',
  min: '${path} must be at least ${min} characters',
  max: '${path} must be at most ${max} characters',
  matches: '${path} must match the following: "${regex}"',
  email: '${path} doit être un email valide',
  url: '${path} must be a valid URL',
  trim: '${path} must be a trimmed string',
  lowercase: '${path} must be a lowercase string',
  uppercase: '${path} must be a upper case string',
};

const number = {
  min: '${path} must be greater than or equal to ${min}',
  max: '${path} must be less than or equal to ${max}',
  lessThan: '${path} must be less than ${less}',
  moreThan: '${path} must be greater than ${more}',
  notEqual: '${path} must be not equal to ${notEqual}',
  positive: '${path} must be a positive number',
  negative: '${path} must be a negative number',
  integer: '${path} must be an integer',
};

const date = {
  min: '${path} field must be later than ${min}',
  max: '${path} field must be at earlier than ${max}',
};

const boolean = {};

const object = {
  noUnknown: '${path} field cannot have keys not specified in the object shape',
};

const array = {
  min: '${path} field must have at least ${min} items',
  max: '${path} field must have less than or equal to ${max} items',
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};