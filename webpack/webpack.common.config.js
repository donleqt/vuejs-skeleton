/* eslint-disable import/no-extraneous-dependencies */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const config = require('../config/index');

const isRunDev = !!process.argv.find(v => v === 'serve');
const mode = isRunDev ? 'development' : config.build.mode;
const useAnalyse = !!process.argv.find(v => v === '--analyse');

const devPlugins = [];

if (useAnalyse) {
  devPlugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: false,
    }),
  );
}

console.log(`- env: ${config.env}.json`);
console.log('- mode:', mode);

module.exports = {
  mode,
  watch: !!process.argv.find(v => v === '--w'),
  stats: {
    warnings: false,
  },
  watchOptions: {
    ignored: [`${__dirname}/dist`],
  },
  resolve: {
    symlinks: false,
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env.ENV': JSON.stringify(config.env),
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.APP_CONFIG': JSON.stringify(config.vueApp),
    }),
    ...devPlugins,
  ],
};
