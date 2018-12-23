const path = require('path');

const env = process.env.ENV || 'development';

const projectRoot = path.join(__dirname, '..');
const defaultConfig = require('./default.json');

/* eslint-disable */
const envConfig = require(__dirname + `/${env}.json`);
/* eslint-enable */

const config = {
  env,
  [env]: true,
  projectRoot,
  vueAppPath: path.join(projectRoot, envConfig.build.outputDir),
  ...envConfig,
  ...defaultConfig,
  vueApp: {
    ...defaultConfig.vueApp,
    ...envConfig.vueApp,
  },
};

// determine app build
if (!config.build.mode) {
  config.build.mode = env === 'production' ? env : 'development';
}

module.exports = config;
