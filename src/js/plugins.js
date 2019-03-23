import './vue-click-outside';

global.isServer = typeof window === 'undefined';
global.isClient = typeof window !== 'undefined';

// expose global variable
// global.jQuery = $;

/* eslint-disable*/
String.prototype.toInt = function toInt() {
  return parseInt(this);
};

String.prototype.toCapitalize = function toCapitalize() {
  return this.replace(/\b\w/g, l => l.toUpperCase());
};

// import theme feature
require('./theme-feature');
