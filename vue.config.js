const config = require('./config');
const webpackExtends = require('./webpack/webpack.client.config');

const src = [`${config.projectRoot}/src`];
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  publicPath: config.vueApp.publicPath,
  outputDir: config.build.outputDir,
  assetsDir: 'assets',
  lintOnSave: !isProduction ? 'error' : false,
  productionSourceMap: false,
  css: {
    sourceMap: !isProduction,
    loaderOptions: {
      sass: {
        includePaths: [src],
      },
    },
  },
  devServer: {
    port: config.devServer.port,
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: `/${config.indexFile}` }],
    },
  },
  configureWebpack: webpackExtends,
  chainWebpack: (webpackConfig) => {
    // disable host check
    webpackConfig.devServer.disableHostCheck(true);

    webpackConfig.plugin('html').tap((opts) => {
      opts[0].filename = config.indexFile;
      opts[0].template = 'public/app.html';
      return opts;
    });

    webpackConfig.module
      .rule('js')
      .test(/\.js$/)
      .exclude.add(/config\/index\.js/);

    webpackConfig.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          transformAssetUrls: {
            img: ['src', 'data-src'],
          },
        };
      });

    // preload
    webpackConfig.plugin('preload').tap((option) => {
      option[0].include = 'allAssets';
      option[0].fileWhitelist = [/pr-.*?\.css/, /pra-.*?\.((js)|(css))/];
      return option;
    });
    webpackConfig.plugin('prefetch').tap((option) => {
      option[0].fileBlacklist = [/(pr-.*\.css)|(pra-)/];
      return option;
    });
  },
};
