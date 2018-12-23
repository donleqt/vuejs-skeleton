const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    "no-console": isProduction ? "error" : "off",
    "no-debugger": isProduction ? "error" : "off",
    "no-unused-vars": "off",
    "eol-last": "off",
    "linebreak-style": "off",
    "no-param-reassign": "off",
    "no-script-url": "off",
    "no-return-assign": "off",
    "no-multi-assign": "off",
    "global-require": "off",
    "import/prefer-default-export": "off",
    "prefer-promise-reject-errors": "off",
    "class-methods-use-this": "off",
    "radix": "off",
    "no-shadow": "off",
    "prefer-destructuring": "off",
    "func-names": "off",
    "no-empty": ["error", {
      allowEmptyCatch: true
    }],
    "max-len": ["error", {
      code: 200
    }],
    "import/extensions": ["error", "always", {
      "js": "never",
      "json": "never"
    }],
    "arrow-body-style": "off",
    "no-restricted-globals": "off",
    "no-underscore-dangle": "off",
    "function-paren-newline": "off"
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  globals: {
    '$': true,
    'jquery': true,
    'console': true
  }
};