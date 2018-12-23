const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
/* eslint-disable */
const baseConfig = require('@vue/cli-service/webpack.config.js');
/* eslint-enable */
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const commonConfig = require('./webpack.common.config');

baseConfig.plugins = baseConfig.plugins.filter((e, idz) => idz !== 4);
baseConfig.optimization = {};

// disable mini extract
baseConfig.module.rules.forEach((r) => {
  const list = r.oneOf || r.use;
  if (list) {
    return list.forEach(
      e =>
        e.use &&
        e.use.forEach((e) => {
          if (e.loader.includes('css-extract')) {
            e.loader = 'null-loader';
          }
        }),
    );
  }
});

module.exports = merge(baseConfig, {
  ...commonConfig,
  // Point entry to your app's server entry file
  entry: `${__dirname}/../src/server/entry-server.js`,

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: 'node',

  // For bundle renderer source map support
  devtool: 'source-map',

  devServer: {
    hot: false,
  },
  // This tells the server bundle to use Node-style exports
  output: {
    libraryTarget: 'commonjs2',
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/,
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [new VueSSRServerPlugin(), ...commonConfig.plugins],

  watch: false,
});
