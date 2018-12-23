const bundleHelper = require('./bundle-helper');
const { createBundleRenderer } = require('vue-server-renderer');

const { serverBundle, clientManifest, template } = bundleHelper.getBundleParts();

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

module.exports = function createRenderer() {
  return renderer;
};
