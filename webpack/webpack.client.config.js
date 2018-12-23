/*eslint-disable*/
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
/* eslint-enable */
const commonConfig = require('./webpack.common.config');

module.exports = {
  ...commonConfig,
  entry: './src/entry-client.js',
  optimization: {
    // Important: this splits the webpack runtime into a leading chunk
    // so that async chunks can be injected right after it.
    // this also enables better caching for your app/vendor code.
    splitChunks: {
      name: 'manifest',
      minChunks: Infinity,
    },
  },
  plugins: [
    // This plugins generates `vue-ssr-client-manifest.json` in the
    // output directory.
    new VueSSRClientPlugin(),
    ...commonConfig.plugins,
  ],
};
