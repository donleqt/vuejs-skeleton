const { validateAndBuildBundle } = require('./ssr/bundle-helper');

validateAndBuildBundle();
require('./server')();
