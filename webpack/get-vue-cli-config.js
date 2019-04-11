/* eslint-disable */
const baseConfig = require('@vue/cli-service/webpack.config.js');
/* eslint-enable */

/**
 * This function help to import webpack config created by vue-cli
 * and we can mod/fix/update that config here.
 *
 */
module.exports = function getVueCliConfig(options) {
  // FIX BUGS in vue-cli config
  baseConfig.plugins = baseConfig.plugins.filter((e, idz) => idz !== 4);
  baseConfig.optimization = {};

  // Fix bug vue build tool
  baseConfig.module.rules.forEach((rule) => {
    if (rule && rule.use) {
      const ruleVue = rule.use.find(e => e.loader === 'vue-loader');
      if (ruleVue) {
        ruleVue.options.cacheDirectory = `${ruleVue.options.cacheDirectory}-ssr`;
      }
    }
  });

  // disable mini extract
  baseConfig.module.rules.forEach((r) => {
    const list = r.oneOf || r.use;
    if (list) {
      return list.forEach((e) => {
        return e.use &&
        e.use.forEach((e) => {
          if (e.loader.includes('css-extract')) {
            e.loader = 'null-loader';
          }
        });
      });
    }
  });

  return baseConfig;
};